import React, { useState, useCallback } from 'react';
// These imports are assumed to be available in the React Native environment,
// but were causing errors in the isolated runtime. We keep the components 
// but remove the conflicting import statements.
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, BackHandler } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from "@react-navigation/native";

// --- Mocking External Imports for Standalone Execution ---
// We redefine React Native and Navigation APIs as simple placeholders 
// to ensure the component structure compiles correctly.
const View = (props) => <div {...props} style={props.style}>{props.children}</div>;
const Text = (props) => <span {...props} style={props.style}>{props.children}</span>;
const TouchableOpacity = (props) => <button {...props} onClick={props.onPress} style={{ ...props.style, border: 'none', background: 'transparent' }}>{props.children}</button>;
// FIX: Updated TextInput mock to use <textarea> when multiline is passed, and destructure RN-specific props.
const TextInput = ({ multiline, numberOfLines, onChangeText, style, ...props }) => {
    const Component = multiline ? 'textarea' : 'input';
    return (
        <Component 
            {...props} 
            onChange={(e) => onChangeText(e.target.value)} 
            style={style} 
        />
    );
};
const Alert = { alert: (title, message) => console.log(`ALERT: ${title} - ${message}`) };
const StyleSheet = { create: (styles) => styles, hairlineWidth: 1 };
const SafeAreaView = View; // Mocking SafeAreaView as a simple View
const useNavigation = () => ({ goBack: () => Alert.alert("Navigation", "Going back...") }); // Mocking navigation hook


// Replace with your actual imports:
// import { pStyles } from "../../utils/theme";
// import PIcon, { PIcons } from "../../components/brick/Icon";

const mockPStyles = {
    // Standard iOS-like color palette
    fontStyleB: 'System-Bold',
    fontStyleR: 'System-Regular',
    fontSizeXL: 22,
    fontSizeL: 16,
    gray: '#8E8E93', // iOS Gray
    darkGray: '#1C1C1E', // iOS Dark Text
    separatorColor: '#C6C6C8', // iOS Separator
    systemBackground: '#F2F2F7', // iOS Background
    systemBlue: '#007AFF',
};

// Mock Icon component (for demonstration)
const PIcons = { Feather: 'Feather', FontAwesome: 'FontAwesome' };
const PIcon = ({ type, name, size, style }) => (
    <Text style={[{ fontSize: size, color: 'black' }, style]}>
        {/* Using Emojis as Feather/FontAwesome placeholders for clarity */}
        {name === 'home' && '🏠'}
        {name === 'briefcase' && '💼'}
        {name === 'map' && '📍'}
        {name === 'angle-right' && '❯'}
        {name === 'angle-left' && '❮'}
        {name === 'save' && '💾'}
    </Text>
);

// --- Initial Address Data ---
const initialAddresses = [
    { id: 'home', label: 'Home', icon: 'home', address: '123/A, Gandhi Street, Chennai - 600001', iconbg: '#007AFF', isDefault: true },
    { id: 'work', label: 'Work', icon: 'briefcase', address: 'B-40, IT Park, Electronic City, Bangalore - 560100', iconbg: '#FF9500', isDefault: false },
    { id: 'other', label: 'Other', icon: 'map', address: 'Tap to add another address.', iconbg: '#34C759', isDefault: false },
];

// --- Sub-Components ---

// 1. Individual Address Row
const AddressItem = React.memo(({ item, onPress }) => {
    const isPlaceholder = item.address.includes('Tap to add');

    return (
        <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => onPress(item)}
            style={styles.addressItemContainer}
        >
            {/* Icon Block */}
            <View style={{ ...styles.iconBlock, backgroundColor: item.iconbg }}>
                <PIcon style={{ color: '#fff' }} type={PIcons.Feather} name={item.icon} size={15} />
            </View>

            {/* Label and Address */}
            <View style={styles.addressContent}>
                <Text style={styles.addressLabel}>{item.label}</Text>
                {/* FIX: Removed numberOfLines which is a React Native prop not supported on web spans */}
                <Text style={[styles.addressText, isPlaceholder && styles.addressPlaceholder]}>
                    {item.address}
                </Text>
            </View>

            {/* Arrow */}
            <PIcon style={styles.arrowIcon} type={PIcons.FontAwesome} name="angle-right" size={18} />
        </TouchableOpacity>
    );
});

// 2. Address Input View (Shown conditionally)
const AddressInputView = ({ address, setAddress, onSave, onCancel }) => {
    return (
        <View style={styles.inputModalOverlay}>
            <View style={styles.inputModalCard}>
                <Text style={styles.inputHeader}>Enter Indian Address</Text>
                
                <TextInput
                    style={styles.addressTextInput}
                    placeholder="Enter your full Indian address here..."
                    placeholderTextColor={mockPStyles.gray}
                    value={address}
                    onChangeText={setAddress}
                    multiline={true}
                    // FIX: Removed numberOfLines as it's not a standard HTML attribute for textarea
                    // numberOfLines={4} 
                    // autoFocus={true} // Removed for web compatibility
                />

                <View style={styles.inputButtonContainer}>
                    <TouchableOpacity onPress={onCancel} style={[styles.inputButton, styles.cancelButton]}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onSave} style={[styles.inputButton, styles.saveButton]}>
                        <Text style={styles.saveText}>Save Address</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};


// --- Main Component ---
export default function Location() {
    const navigation = useNavigation();
    
    // State to hold all user addresses
    const [addresses, setAddresses] = useState(initialAddresses);
    
    // State to manage the input/editing process
    const [editingAddress, setEditingAddress] = useState(null); // The item being edited (or null)
    const [currentInput, setCurrentInput] = useState(''); // The text currently in the input field

    // Navigation back to Settings
    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    // Handle tapping an address item to start editing
    const handleEditStart = useCallback((item) => {
        setEditingAddress(item);
        // Load existing address into the input, or clear it if it's a placeholder
        setCurrentInput(item.address.includes('Tap to add') ? '' : item.address);
    }, []);
    
    // Handle saving the new address
    const handleSaveAddress = useCallback(() => {
        if (!currentInput.trim()) {
            Alert.alert("Error", "Please enter a valid address.");
            return;
        }

        setAddresses(prevAddresses => prevAddresses.map(addr => 
            addr.id === editingAddress.id 
                ? { ...addr, address: currentInput.trim() }
                : addr
        ));

        // Reset state after saving
        setEditingAddress(null);
        setCurrentInput('');

        Alert.alert("Success", `${editingAddress.label} address saved successfully!`);
        
    }, [currentInput, editingAddress]);

    // Render the list of addresses
    const renderAddressList = () => (
        <View style={styles.groupBlock}>
            <Text style={styles.groupHeader}>YOUR SAVED LOCATIONS</Text>
            {addresses.map((item, index) => (
                <View key={item.id}>
                    <AddressItem 
                        item={item} 
                        onPress={handleEditStart} 
                    />
                    {/* Add separator except for the last item */}
                    {index < addresses.length - 1 && <View style={styles.listSeparator} />}
                </View>
            ))}
        </View>
    );
    
    // Render the default address (Home) as a prominent header banner
    const defaultAddress = addresses.find(a => a.isDefault);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Custom iOS-style Header (Back button on the left) */}
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
                    <PIcon style={styles.headerBackIcon} type={PIcons.FontAwesome} name="angle-left" size={24} />
                    <Text style={styles.headerBackText}>Settings</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your Locations</Text>
                <View style={styles.headerButton} /> {/* Placeholder for alignment */}
            </View>

            <View style={styles.container}>
                
                {/* Default Address Banner */}
                {defaultAddress && (
                    <View style={styles.defaultAddressBanner}>
                        <Text style={styles.defaultLabel}>Default Address ({defaultAddress.label})</Text>
                        {/* FIX: Removed numberOfLines */}
                        <Text style={styles.defaultAddressText}>
                            {defaultAddress.address}
                        </Text>
                    </View>
                )}

                {/* Main Address List */}
                {renderAddressList()}

                {/* Input Modal/Overlay */}
                {editingAddress && (
                    <AddressInputView
                        address={currentInput}
                        setAddress={setCurrentInput}
                        onSave={handleSaveAddress}
                        onCancel={() => { setEditingAddress(null); setCurrentInput(''); }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

// --- Stylesheet for iOS Look ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: mockPStyles.systemBackground, 
    },
    container: {
        flex: 1,
        paddingHorizontal: 15, // Side padding for the groups
        paddingTop: 10,
    },
    
    // --- iOS Navigation Header ---
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 44, // Standard navigation bar height
        backgroundColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: mockPStyles.separatorColor,
    },
    headerTitle: {
        fontSize: mockPStyles.fontSizeL,
        fontFamily: mockPStyles.fontStyleB,
        color: mockPStyles.darkGray,
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    headerBackIcon: {
        color: mockPStyles.systemBlue || '#007AFF',
        fontSize: 20,
        marginRight: -4, // Pull icon closer to text
    },
    headerBackText: {
        color: mockPStyles.systemBlue || '#007AFF',
        fontSize: mockPStyles.fontSizeL,
        fontFamily: mockPStyles.fontStyleR,
    },

    // --- Default Address Banner ---
    defaultAddressBanner: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: mockPStyles.separatorColor,
    },
    defaultLabel: {
        fontSize: 12,
        fontFamily: mockPStyles.fontStyleB,
        color: mockPStyles.gray,
        marginBottom: 5,
    },
    defaultAddressText: {
        fontSize: 14,
        fontFamily: mockPStyles.fontStyleR,
        color: mockPStyles.darkGray,
    },

    // --- Grouped List Style ---
    groupHeader: {
        fontSize: 13,
        fontFamily: mockPStyles.fontStyleR,
        color: mockPStyles.gray,
        paddingLeft: 10,
        marginBottom: 8,
    },
    groupBlock: {
        backgroundColor: 'white',
        borderRadius: 10, // Rounded corners for the group
        overflow: 'hidden', // Ensures separators are contained
        marginBottom: 20, 
    },
    
    // --- List Item Style ---
    addressItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 60, // Taller items for address text
        paddingVertical: 10,
        paddingRight: 15,
        backgroundColor: 'white',
    },
    iconBlock: {
        width: 30,
        height: 30,
        borderRadius: 6, 
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    addressContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    addressLabel: {
        fontSize: 16,
        fontFamily: mockPStyles.fontStyleR,
        color: mockPStyles.darkGray,
        marginBottom: 2,
    },
    addressText: {
        fontSize: 13,
        fontFamily: mockPStyles.fontStyleR,
        color: mockPStyles.darkGray,
    },
    addressPlaceholder: {
        color: mockPStyles.gray,
        fontStyle: 'italic',
    },
    arrowIcon: {
        color: mockPStyles.gray,
        paddingLeft: 10,
    },
    listSeparator: {
        // Separator starts after the icon block
        height: StyleSheet.hairlineWidth,
        backgroundColor: mockPStyles.separatorColor,
        marginLeft: 60, 
    },

    // --- Input Modal/Overlay Styles (Simple conditional rendering) ---
    inputModalOverlay: {
        // Mocking absolute fill and fixed positioning for the modal
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        // Ensure overlay takes up full screen (important for web preview)
        width: '100%',
        height: '100%',
    },
    inputModalCard: {
        width: '90%',
        maxWidth: 400, // Optional max-width for better desktop look
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
    },
    inputHeader: {
        fontSize: 18,
        fontFamily: mockPStyles.fontStyleB,
        marginBottom: 15,
        textAlign: 'center',
        color: mockPStyles.darkGray,
    },
    addressTextInput: {
        minHeight: 80,
        backgroundColor: mockPStyles.systemBackground,
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
        fontFamily: mockPStyles.fontStyleR,
        borderColor: mockPStyles.separatorColor,
        borderWidth: 1,
        textAlignVertical: 'top',
        color: mockPStyles.darkGray,
        // Mocking resize behavior for TextInput
        resize: 'vertical',
        width: '100%',
        boxSizing: 'border-box',
    },
    inputButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    inputButton: {
        flex: 1,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center', // Added for button text centering
        marginHorizontal: 5,
        cursor: 'pointer', // Indicate button functionality
    },
    cancelButton: {
        backgroundColor: mockPStyles.systemBackground,
        borderWidth: 1,
        borderColor: mockPStyles.gray,
    },
    saveButton: {
        backgroundColor: '#007AFF', // System Blue
    },
    cancelText: {
        color: mockPStyles.darkGray,
        fontFamily: mockPStyles.fontStyleR,
        fontSize: 16,
    },
    saveText: {
        color: 'white',
        fontFamily: mockPStyles.fontStyleB,
        fontSize: 16,
    },
});