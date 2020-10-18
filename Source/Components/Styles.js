import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export default StyleSheet.create({
    MainLogo:{
        fontSize:responsiveFontSize(5),
        fontWeight:"bold"
    },
    Imagelogo:{
        height:responsiveWidth(20),
        width:responsiveWidth(20)
    },
    inputField:{
        width:responsiveWidth(90),
        borderBottomWidth:1,
        alignSelf:"center"
    },
    Button1:{
        backgroundColor:"#2962ff",
        paddingHorizontal:responsiveWidth(15),
        paddingVertical:responsiveWidth(2),
        borderRadius:10
    },
    NewsCard:{
        width:responsiveWidth(98),
        paddingBottom:responsiveWidth(2),
        alignSelf:"center",
        borderRadius:10
    },
    MainImage:{
        width:responsiveWidth(98),
        height:responsiveHeight(20),
        borderTopLeftRadius:10,
        borderTopRightRadius:10
    }
})