import react from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';
import {themeColors} from '../../utils/constant';

/***
 * BtnConfig will have following properties
 * 
    config={{
      maxLength: *
      keyboardType: 
      label: *
      styles: 
    }} 
    
    (config, funs...)
    Ref :: https://reactnative.dev/docs/textinput
 */

const PInputOutlined = ({config, onTextChange,...rest}) => {
  // const onChangeText = (e) => onTextChange(e);

  return (
    <OutlinedTextField
        {...rest}
      variant="outlined"
      label={config.label}
      baseColor={themeColors.secondary}
      tintColor={themeColors.secondary}
      textColor={themeColors.primary}
      styles={[config.styles]}
      maxLength={config.maxLength}
      keyboardType={config.keyboardType || 'default'}
      onChangeText={e => {
        onTextChange(e);
      }}
      InputLabelProps={{
        // This prop forces the label to stay at the top (shrunk)
        shrink: true,
      }}
    />
  );
};

const PInputFilled = ({config, onTextChange}) => {
  const onChangeText = e => onTextChange(e);

  return (
    <FilledTextField
      label={config.label}
      baseColor={themeColors.secondary}
      tintColor={themeColors.secondary}
      textColor={themeColors.primary}
      styles={[config.styles]}
      containerStyle={{backgroundColor: themeColors.yellow}}
      maxLength={config.maxLength}
      keyboardType={config.keyboardType || 'default'}
      onChangeText={onChangeText}
    />
  );
};

export {PInputOutlined, PInputFilled};
