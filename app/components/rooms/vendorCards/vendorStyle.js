import { StyleSheet } from "react-native";
import { themeColors } from "../../../utils/constant";
import { fonts, pStyles } from "../../../utils/theme";

export const vCardStyles = {
    //FIRST BLOCK
    C1: {
        main: { flex: 1, marginTop: 10, marginBottom: 10, borderRightWidth: 1, borderRightColor: pStyles.lightGray },
        container: { height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' },
        quotedAmtTxt: { fontFamily: pStyles.fontStyleM, fontSize: 18 },
        savelabelTxt: { fontSize: pStyles.fontSizeSM, fontFamily: pStyles.fontStyleBI, color: pStyles.primary, opacity: 0.6 },
        saveValueTxt: { fontSize: pStyles.fontSizeM - 2, fontFamily: pStyles.fontStyleBI, color: pStyles.primary },
        bargainMain: { justifyContent: 'center', width: 55, height: 17, borderRadius: 4 },
        bargainContainer: { height: 20, borderRadius: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: pStyles.lightGray },
        bargainLabelTxt: { fontSize: 8, opacity: 0.9, fontFamily: pStyles.fontStyleB, letterSpacing: 1.2, color: pStyles.primary, textAlign: 'center' }
    },
    C2: {
        main: { flex: 3, flexDirection: 'row', height: 150, justifyContent: 'center', alignSelf: 'center' },
        container: { height: 150, width: '97%', flexDirection: 'column' },
        blockA: { height: 105, padding: 10 },
        blockB: { height: 45, paddingLeft: 10 },
        blockAContainer: { height: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
        blockAContainerSubBlockA: { height: 30, width: '60%', overflow: 'hidden', flexDirection: 'row', alignItems: 'flex-start' },
        blockAContainerSubBlockB: { height: 30, width: '40%', flexDirection: 'column', justifyContent: 'flex-end' },
        blockBContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 3 },
        blockBContainerBlock: { paddingTop: 10, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: themeColors.lightGray },
        blockBContainerBlockB: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' },
        startRatingContainer: { justifyContent: 'center', alignItems: 'center' },
        startRatingLabel: { fontSize: 9, fontFamily: fonts.RubikMediumItalic, color: themeColors.primary, paddingLeft: 20 },
        angleRightContainer: { height: 150, justifyContent: 'center', alignSelf: 'flex-end', width: '3%', },
        angleRightIcon: { color: themeColors.gray, opacity: 0.5 }
    },
    common: {
        expLabel: { fontSize: 9, fontFamily: fonts.RubikMedium, letterSpacing: 1.1, color: themeColors.primary, opacity: 0.7 },
        expValue: { fontSize: 10, fontFamily: fonts.RubikMedium, color: themeColors.primary, paddingLeft: 5, opacity: 0.9 },
        container: { flex: 1.5, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' },
        labelTxt: { fontFamily: fonts.RubikMedium, fontSize: 11, opacity: 0.7, color: themeColors.darkGray },
        valueTxt: { fontFamily: fonts.RubikBlack, fontSize: 12, opacity: 0.7, color: themeColors.darkGray }, nameLabelTxt: { fontSize: 18, fontFamily: fonts.RubikMedium, color: themeColors.primary },
        nameLabelTxt: { fontSize: 18, fontFamily: fonts.RubikMedium, color: themeColors.primary },
        tagContainer: { alignItems: 'center', justifyContent: 'center', backgroundColor: themeColors.lightGray, borderRadius: 8, paddingLeft: 6, paddingRight: 6 },
        tagTxt: { fontSize: 12, fontFamily: fonts.RubikMedium, color: themeColors.primary, opacity: 1 },
        yellow: pStyles.yellow,
        gray: pStyles.gray
    }
}
