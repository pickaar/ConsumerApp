import { themeColors } from "./constant"

export const fonts = {
    RubikBlack: 'Rubik-Black',
    RubikBlackItalic: 'Rubik-BlackItalic',
    RubikBold: 'Rubik-Bold',
    RubikBoldItalic: 'Rubik-BoldItalic',
    RubikExtraBold: 'Rubik-ExtraBold',
    RubikExtraBoldItalic: 'Rubik-ExtraBoldItalic',
    RubikItalic: 'Rubik-Italic',
    RubikLight: 'Rubik-Light',
    RubikLightItalic: 'Rubik-LightItalic',
    RubikMedium: 'Rubik-Medium',
    RubikMediumItalic: 'Rubik-MediumItalic',
    RubikRegular: 'Rubik-Regular',
    RubikSemiBold: 'Rubik-SemiBold',
    RubikSemiBoldItalic: 'Rubik-SemiBoldItalic'
}

export const pStyles = {
    fontSizeSM: 8,
    fontSizeM: 12,
    fontSizeL: 16,
    fontSizeXL: 20,
    fontSizeXXL: 26,

    fontStyleM: fonts.RubikMedium,
    fontStyleMI: fonts.RubikMediumItalic,
    fontStyleB: fonts.RubikBold,
    fontStyleBI: fonts.RubikBoldItalic,
    fontStyleLI: fonts.RubikLightItalic,
    fontStyleL: fonts.RubikLight,
    fontStyleR: fonts.RubikRegular,

    white: themeColors.white,
    yellow: themeColors.yellow,
    primary: themeColors.primary,
    lightGray: themeColors.lightGray,
    darkGray: themeColors.darkGray,
    gray: themeColors.gray,
    recommendedColor: themeColors.recommendedBgColor,
    premiumColor: themeColors.premiumColor,
    regularColor: themeColors.yellow,
    economyColor: '#5188f9',
    infoHighlightColor: '#2667c5',

    txtMediumWhite: {
        fontSize: 16,
        fontFamily: fonts.RubikMedium,
        color: themeColors.white
    },
    txtSmLightWhite: {
        fontSize: 8,
        fontFamily: fonts.RubikLight,
        color: themeColors.white
    },
    txtMediumLightWhite: {
        fontSize: 12,
        fontFamily: fonts.RubikLight,
        color: themeColors.white
    }
}