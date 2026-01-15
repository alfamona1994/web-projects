import React, { useState } from "react";
import { JSX } from "react";
import { AccountBalance, 
    AccountBalanceWallet, 
    AddShoppingCart,
    Nightlife,
    CreditCard,
    AttachMoney,
    MonetizationOn,
    LocalOffer,
    ShoppingCart,
    Store,
    Wallet,
    Savings,
    TrendingUp,
    Assessment,
    BusinessCenter,
    CardTravel,
    CardGiftcard,
    PointOfSale,
    RequestQuote,
    Receipt,
    Inventory,
    Storefront,
    LocalAtm,
    PriceChange,
    LocalFireDepartment,
    LocalDining,
    LocalFlorist,
    LocalGasStation,
    LocalGroceryStore,
    LocalHospital,
    LocalHotel,
    LocalLaundryService,
    LocalLibrary,
    LocalMovies,
    LocalPharmacy,
    LocalPizza,
    LocalPlay,
    LocalPostOffice,
    LocalPrintshop,
    LocalShipping,
    LocalTaxi,
    CurrencyBitcoin,
    CurrencyExchange,
    CurrencyFranc,
    CurrencyPound,
    CurrencyRuble,
    CurrencyRupee,
    CurrencyYuan,
    Downloading,
    EmojiEvents,
    Engineering,
    Exposure,
    FavoriteBorder,
    Favorite,
    Feedback,
    Festival,
    FiberManualRecord,
    FileCopy,
    FileDownload,
    FileUpload,
    FilterList,
    FilterVintage,
    Fingerprint,
    FitnessCenter,
    Flag,
    Flight,
    FlightTakeoff,
    Flood,
    Fluorescent,
    FlutterDash,
    Payment,
    Percent,
    Discount,
    Money,
    Paid,
    Error,
    Expand,
    Explore,
    Face } from "@mui/icons-material";

    export const getIconComponent = (
    iconName: string,
    textColor: string = "text-black",
    fontSize: string = "text-[23px]"
    ): JSX.Element => {
        const defaultFontSize = fontSize || "text-[23px]";
        const defaultTextColor = textColor || "text-orange-600";

        const iconProps = {
            sx: { fontSize : fontSize || defaultFontSize },
            className: `${textColor} ${fontSize}`,
        };

        switch (iconName) {
        case "AccountBalance":
            return <AccountBalance {...iconProps} />;
        case "AccountBalanceWallet":
            return <AccountBalanceWallet {...iconProps} />;
        case "AddShoppingCart":
            return <AddShoppingCart {...iconProps} />;
        case "Nightlife":
            return <Nightlife {...iconProps} />;
        case "CreditCard":
            return <CreditCard {...iconProps} />;
        case "AttachMoney":
            return <AttachMoney {...iconProps} />;
        case "MonetizationOn":
            return <MonetizationOn {...iconProps} />;
        case "LocalOffer":
            return <LocalOffer {...iconProps} />;
        case "ShoppingCart":
            return <ShoppingCart {...iconProps} />;
        case "Store":
            return <Store {...iconProps} />;
        case "Wallet":
            return <Wallet {...iconProps} />;

        case "Savings":
            return <Savings {...iconProps} />;
        case "TrendingUp":
            return <TrendingUp {...iconProps} />;
        case "Assessment":
            return <Assessment {...iconProps} />;
        case "BusinessCenter":
            return <BusinessCenter {...iconProps} />;
        case "CardTravel":
            return <CardTravel {...iconProps} />;
        case "CardGiftcard":
            return <CardGiftcard {...iconProps} />;
        case "PointOfSale":
            return <PointOfSale {...iconProps} />;
        case "RequestQuote":
            return <RequestQuote {...iconProps} />;
        case "Receipt":
            return <Receipt {...iconProps} />;
        case "Inventory":
            return <Inventory {...iconProps} />;
        case "Storefront":
            return <Storefront {...iconProps} />;
        case "LocalAtm":
            return <LocalAtm {...iconProps} />;
        case "PriceChange":
            return <PriceChange {...iconProps} />;
        case "LocalFireDepartment":
            return <LocalFireDepartment {...iconProps} />;
        case "LocalDining":
            return <LocalDining {...iconProps} />;
        case "LocalFlorist":
            return <LocalFlorist {...iconProps} />;
        case "LocalGasStation":
            return <LocalGasStation {...iconProps} />;
        case "LocalGroceryStore":
            return <LocalGroceryStore {...iconProps} />;
        case "LocalHospital":
            return <LocalHospital {...iconProps} />;
        case "LocalHotel":
            return <LocalHotel {...iconProps} />;
        case "LocalLaundryService":
            return <LocalLaundryService {...iconProps} />;
        case "LocalLibrary":
            return <LocalLibrary {...iconProps} />;
        case "LocalMovies":
            return <LocalMovies {...iconProps} />;
        case "LocalPharmacy":
            return <LocalPharmacy {...iconProps} />;
        case "LocalPizza":
            return <LocalPizza {...iconProps} />;
        case "LocalPlay":
            return <LocalPlay {...iconProps} />;
        case "LocalPostOffice":
            return <LocalPostOffice {...iconProps} />;
        case "LocalPrintshop":
            return <LocalPrintshop {...iconProps} />;
        case "LocalShipping":
            return <LocalShipping {...iconProps} />;
        case "LocalTaxi":
            return <LocalTaxi {...iconProps} />;
        case "CurrencyBitcoin":
            return <CurrencyBitcoin {...iconProps} />;
        case "CurrencyExchange":
            return <CurrencyExchange {...iconProps} />;
        case "CurrencyFranc":
            return <CurrencyFranc {...iconProps} />;
        case "CurrencyPound":
            return <CurrencyPound {...iconProps} />;
        case "CurrencyRuble":
            return <CurrencyRuble {...iconProps} />;
        case "CurrencyRupee":
            return <CurrencyRupee {...iconProps} />;
        case "CurrencyYuan":
            return <CurrencyYuan {...iconProps} />;
        case "Downloading":
            return <Downloading {...iconProps} />;
        case "EmojiEvents":
            return <EmojiEvents {...iconProps} />;
        case "Engineering":
            return <Engineering {...iconProps} />;
        case "Exposure":
            return <Exposure {...iconProps} />;
        case "FavoriteBorder":
            return <FavoriteBorder {...iconProps} />;
        case "Favorite":
            return <Favorite {...iconProps} />;
        case "Feedback":
            return <Feedback {...iconProps} />;
        case "Festival":
            return <Festival {...iconProps} />;
        case "FiberManualRecord":
            return <FiberManualRecord {...iconProps} />;
        case "FileCopy":
            return <FileCopy {...iconProps} />;
        case "FileDownload":
            return <FileDownload {...iconProps} />;
        case "FileUpload":
            return <FileUpload {...iconProps} />;
        case "FilterList":
            return <FilterList {...iconProps} />;
        case "FilterVintage":
            return <FilterVintage {...iconProps} />;
        case "Fingerprint":
            return <Fingerprint {...iconProps} />;
        case "FitnessCenter":
            return <FitnessCenter {...iconProps} />;
        case "Flag":
            return <Flag {...iconProps} />;
        case "Flight":
            return <Flight {...iconProps} />;
        case "FlightTakeoff":
            return <FlightTakeoff {...iconProps} />;
        case "Flood":
            return <Flood {...iconProps} />;
        case "Fluorescent":
            return <Fluorescent {...iconProps} />;
        case "FlutterDash":
            return <FlutterDash {...iconProps} />;
        default:
            return <Face {...iconProps} />;
    }
}

export function ProjectWindow() {
  return null;
}
