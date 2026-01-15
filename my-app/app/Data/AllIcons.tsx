import { IconData } from "@/app/Pages/types/AppType";
import React, { useState } from "react";
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
import { useContextApp } from "../contextApp";

export const allIconArray: IconData[] = [
{
    id: 1,
    icon: <AccountBalance className=" text-[23px]" />,
    name: "AccountBalance",
    isSelected: true,
},
{
    id: 2,
    icon: <AccountBalanceWallet className=" text-[23px]" />,
    name: "AccountBalanceWallet",
    isSelected: false,
},
{
    id: 3,
    icon: <AddShoppingCart className=" text-[23px]" />,
    name: "AddShoppingCart",
    isSelected: false,
},
{
    id: 4,
    icon: <Nightlife className=" text-[23px]" />,
    name: "Nightlife",
    isSelected: false,
},
{
    id: 5,
    icon: <AttachMoney className=" text-[23px]" />,
    name: "Money",
    isSelected: false,
},
{
    id: 6,
    icon: <CreditCard className=" text-[23px]" />,
    name: "CreditCard",
    isSelected: false,
},
{
    id: 7,
    icon: <AttachMoney className=" text-[23px]" />,
    name: "AttachMoney",
    isSelected: false,
},
{
    id: 8,
    icon: <MonetizationOn className=" text-[23px]" />,
    name: "MonetizationOn",
    isSelected: false,
},
{
    id: 9,
    icon: <LocalOffer className=" text-[23px]" />,
    name: "LocalOffer",
    isSelected: false,
},
{
    id: 10,
    icon: <ShoppingCart className=" text-[23px]" />,
    name: "ShoppingCart",
    isSelected: false,
},
{
    id: 11,
    icon: <Store className=" text-[23px]" />,
    name: "Store",
    isSelected: false,
},
{
    id: 12,
    icon: <Wallet className=" text-[23px]" />,
    name: "Wallet",
    isSelected: false,
},
{
    id: 13,
    icon: <Savings className=" text-[23px]" />,
    name: "Savings",
    isSelected: false,
},
{
    id: 14,
    icon: <TrendingUp className=" text-[23px]" />,
    name: "TrendingUp",
    isSelected: false,
},
{
    id: 15,
    icon: <Assessment className=" text-[23px]" />,
    name: "Assessment",
    isSelected: false,
},
{
    id: 16,
    icon: <AccountBalance className=" text-[23px]" />,
    name: "BankAccount",
    isSelected: false,
},
{
    id: 17,
    icon: <BusinessCenter className=" text-[23px]" />,
    name: "BusinessCenter",
    isSelected: false,
},
{
    id: 18,
    icon: <CardTravel className=" text-[23px]" />,
    name: "CardTravel",
    isSelected: false,
},
{
    id: 19,
    icon: <CardGiftcard className=" text-[23px]" />,
    name: "CardGiftcard",
    isSelected: false,
},
{
    id: 20,
    icon: <PointOfSale className=" text-[23px]" />,
    name: "PointOfSale",
    isSelected: false,
},
{
    id: 21,
    icon: <RequestQuote className=" text-[23px]" />,
    name: "RequestQuote",
    isSelected: false,
},
{
    id: 22,
    icon: <Receipt className=" text-[23px]" />,
    name: "Receipt",
    isSelected: false,
},
{
    id: 23,
    icon: <Inventory className=" text-[23px]" />,
    name: "Inventory",
    isSelected: false,
},
{
    id: 24,
    icon: <Storefront className=" text-[23px]" />,
    name: "Storefront",
    isSelected: false,
},
{
    id: 25,
    icon: <LocalAtm className=" text-[23px]" />,
    name: "LocalAtm",
    isSelected: false,
},
{
    id: 26,
    icon: <Payment className=" text-[23px]" />,
    name: "Payment",
    isSelected: false,
},
{
    id: 27,
    icon: <PriceChange className=" text-[23px]" />,
    name: "PriceChange",
    isSelected: false,
},
{
    id: 28,
    icon: <Percent className=" text-[23px]" />,
    name: "Percent",
    isSelected: false,
},
{
    id: 29,
    icon: <Discount className=" text-[23px]" />,
    name: "Discount",
    isSelected: false,
},
{
    id: 30,
    icon: <LocalFireDepartment className=" text-[23px]" />,
    name: "LocalFireDepartment",
    isSelected: false,
},
{
    id: 31,
    icon: <LocalDining className=" text-[23px]" />,
    name: "LocalDining",
    isSelected: false,
},
{
    id: 32,
    icon: <LocalFlorist className=" text-[23px]" />,
    name: "LocalFlorist",
    isSelected: false,
},
{
    id: 33,
    icon: <LocalGasStation className=" text-[23px]" />,
    name: "LocalGasStation",
    isSelected: false,
},
{
    id: 34,
    icon: <LocalGroceryStore className=" text-[23px]" />,
    name: "LocalGroceryStore",
    isSelected: false,
},
{
    id: 35,
    icon: <LocalHospital className=" text-[23px]" />,
    name: "LocalHospital",
    isSelected: false,
},
{
    id: 36,
    icon: <LocalHotel className=" text-[23px]" />,
    name: "LocalHotel",
    isSelected: false,
},
{
    id: 37,
    icon: <LocalLaundryService className=" text-[23px]" />,
    name: "LocalLaundryService",
    isSelected: false,
},
{
    id: 38,
    icon: <LocalLibrary className=" text-[23px]" />,
    name: "LocalLibrary",
    isSelected: false,
},
{
    id: 39,
    icon: <LocalMovies className=" text-[23px]" />,
    name: "LocalMovies",
    isSelected: false,
},
{
    id: 40,
    icon: <LocalPharmacy className=" text-[23px]" />,
    name: "LocalPharmacy",
    isSelected: false,
},
{
    id: 41,
    icon: <LocalPizza className=" text-[23px]" />,
    name: "LocalPizza",
    isSelected: false,
},
{
    id: 42,
    icon: <LocalPlay className=" text-[23px]" />,
    name: "LocalPlay",
    isSelected: false,
},
{
    id: 43,
    icon: <LocalPostOffice className=" text-[23px]" />,
    name: "LocalPostOffice",
    isSelected: false,
},
{
    id: 44,
    icon: <LocalPrintshop className=" text-[23px]" />,
    name: "LocalPrintshop",
    isSelected: false,
},
{
    id: 45,
    icon: <LocalShipping className=" text-[23px]" />,
    name: "LocalShipping",
    isSelected: false,
},
{
    id: 46,
    icon: <LocalTaxi className=" text-[23px]" />,
    name: "LocalTaxi",
    isSelected: false,
},
{
    id: 47,
    icon: <Money className=" text-[23px]" />,
    name: "Money",
    isSelected: false,
},
{
    id: 48,
    icon: <Paid className=" text-[23px]" />,
    name: "PaidIcon",
    isSelected: false,
},
{
    id: 49,
    icon: <CurrencyBitcoin className=" text-[23px]" />,
    name: "CurrencyBitcoin",
    isSelected: false,
},
{
    id: 50,
    icon: <CurrencyExchange className=" text-[23px]" />,
    name: "CurrencyExchange",
    isSelected: false,
},
{
    id: 51,
    icon: <CurrencyFranc className=" text-[23px]" />,
    name: "CurrencyFranc",
    isSelected: false,
},
{
    id: 52,
    icon: <CurrencyPound className=" text-[23px]" />,
    name: "CurrencyPound",
    isSelected: false,
},
{
    id: 53,
    icon: <CurrencyRuble className=" text-[23px]" />,
    name: "CurrencyRuble",
    isSelected: false,
},
{
    id: 54,
    icon: <CurrencyRupee className=" text-[23px]" />,
    name: "CurrencyRupee",
    isSelected: false,
},
{
    id: 55,
    icon: <CurrencyYuan className=" text-[23px]" />,
    name: "CurrencyYuan",
    isSelected: false,
},
{
    id: 56,
    icon: <Downloading className=" text-[23px]" />,
    name: "Downloading",
    isSelected: false,
},
{
    id: 57,
    icon: <AttachMoney className=" text-[23px]" />,
    name: "Earnings",
    isSelected: false,
},
{
    id: 58,
    icon: <EmojiEvents className=" text-[23px]" />,
    name: "EmojiEvents",
    isSelected: false,
},
{
    id: 59,
    icon: <Engineering className=" text-[23px]" />,
    name: "Engineering",
    isSelected: false,
},
{
    id: 60,
    icon: <Receipt className=" text-[23px]" />,
    name: "Envelope",
    isSelected: false,
},
{
    id: 61,
    icon: <Error className=" text-[23px]" />,
    name: "Error",
    isSelected: false,
},
{
    id: 62,
    icon: <Expand className=" text-[23px]" />,
    name: "Expand",
    isSelected: false,
},
{
    id: 63,
    icon: <Explore className=" text-[23px]" />,
    name: "Explore",
    isSelected: false,
},
{
    id: 64,
    icon: <Exposure className=" text-[23px]" />,
    name: "Exposure",
    isSelected: false,
},
{
    id: 65,
    icon: <LocalShipping className=" text-[23px]" />,
    name: "Express",
    isSelected: false,
},
{
    id: 66,
    icon: <Face className=" text-[23px]" />,
    name: "Face",
    isSelected: false,
},
{
    id: 67,
    icon: <FavoriteBorder className=" text-[23px]" />,
    name: "FavoriteBorder",
    isSelected: false,
},
{
    id: 68,
    icon: <Favorite className=" text-[23px]" />,
    name: "Favorite",
    isSelected: false,
},
{
    id: 69,
    icon: <Feedback className=" text-[23px]" />,
    name: "Feedback",
    isSelected: false,
},
{
    id: 70,
    icon: <Festival className=" text-[23px]" />,
    name: "Festival",
    isSelected: false,
},
{
    id: 71,
    icon: <FiberManualRecord className=" text-[23px]" />,
    name: "FiberManualRecord",
    isSelected: false,
},
{
    id: 72,
    icon: <FileCopy className=" text-[23px]" />,
    name: "FileCopy",
    isSelected: false,
},
{
    id: 73,
    icon: <FileDownload className=" text-[23px]" />,
    name: "FileDownload",
    isSelected: false,
},
{
    id: 74,
    icon: <FileUpload className=" text-[23px]" />,
    name: "FileUpload",
    isSelected: false,
},
{
    id: 75,
    icon: <FilterList className=" text-[23px]" />,
    name: "FilterList",
    isSelected: false,
},
{
    id: 76,
    icon: <FilterVintage className=" text-[23px]" />,
    name: "FilterVintage",
    isSelected: false,
},
{
    id: 77,
    icon: <Fingerprint className=" text-[23px]" />,
    name: "FingerPrint",
    isSelected: false,
},
{
    id: 78,
    icon: <FitnessCenter className=" text-[23px]" />,
    name: "FitnessCenter",
    isSelected: false,
},
{
    id: 79,
    icon: <FitnessCenter className=" text-[23px]" />,
    name: "Fitness",
    isSelected: false,
},
{
    id: 80,
    icon: <Assessment className=" text-[23px]" />,
    name: "FiveG",
    isSelected: false,
},
{
    id: 81,
    icon: <Flag className=" text-[23px]" />,
    name: "Flag",
    isSelected: false,
},
{
    id: 82,
    icon: <Flight className=" text-[23px]" />,
    name: "Flight",
    isSelected: false,
},
{
    id: 83,
    icon: <FlightTakeoff className=" text-[23px]" />,
    name: "FlightTakeoff",
    isSelected: false,
},
{
    id: 84,
    icon: <Flood className=" text-[23px]" />,
    name: "Flood",
    isSelected: false,
},
{
    id: 85,
    icon: <Flood className=" text-[23px]" />,
    name: "Floor",
    isSelected: false,
},
{
    id: 86,
    icon: <LocalFlorist className=" text-[23px]" />,
    name: "Flower",
    isSelected: false,
},
{
    id: 87,
    icon: <Fluorescent className=" text-[23px]" />,
    name: "Fluorescent",
    isSelected: false,
},
{
    id: 88,
    icon: <FlutterDash className=" text-[23px]" />,
    name: "FlutterDash",
    isSelected: false,
},
{
    id: 89,
    icon: <AccountBalance className=" text-[23px]" />,
    name: "Dashboard",
    isSelected: false,
},
{
    id: 90,
    icon: <ShoppingCart className=" text-[23px]" />,
    name: "ShoppingCart2",
    isSelected: false,
},
{
    id: 91,
    icon: <Store className=" text-[23px]" />,
    name: "Store2",
    isSelected: false,
},
{
    id: 92,
    icon: <Wallet className=" text-[23px]" />,
    name: "Wallet2",
    isSelected: false,
},
{
    id: 93,
    icon: <Savings className=" text-[23px]" />,
    name: "Savings2",
    isSelected: false,
},
{
    id: 94,
    icon: <TrendingUp className=" text-[23px]" />,
    name: "TrendingUp2",
    isSelected: false,
},
{
    id: 95,
    icon: <Assessment className=" text-[23px]" />,
    name: "Assessment2",
    isSelected: false,
},
{
    id: 96,
    icon: <CreditCard className=" text-[23px]" />,
    name: "CreditCard2",
    isSelected: false,
},
{
    id: 97,
    icon: <AttachMoney className=" text-[23px]" />,
    name: "AttachMoney2",
    isSelected: false,
},
{
    id: 98,
    icon: <MonetizationOn className=" text-[23px]" />,
    name: "MonetizationOn2",
    isSelected: false,
},
{
    id: 99,
    icon: <LocalOffer className=" text-[23px]" />,
    name: "LocalOffer2",
    isSelected: false,
},
{
    id: 100,
    icon: <Paid className=" text-[23px]" />,
    name: "Paid2",
    isSelected: false,
},
];

export default function AllIcons() {
    const contextApp = useContextApp();
    const allIconsData = contextApp?.allIconsDataObject?.allIconsData || [];
    const setAllIconsData = contextApp?.allIconsDataObject?.setAllIconsData || (() => {});
    const selectedIcon = contextApp?.selectedIconObject?.selectedIcon || null;
    const setSelectedIcon = contextApp?.selectedIconObject?.setSelectedIcon || (() => {});
    const setOpenIconWindow = contextApp?.openIconWindowObject?.setOpenIconWindow || (() => {});
         
    function handleTheIconSelection(singleIcon: IconData) {
        setAllIconsData((prevIcons: IconData[]) =>
            prevIcons.map((icon: IconData) => {
                if (icon.name === singleIcon.name) {
                    setSelectedIcon(singleIcon);
                    return { ...icon, isSelected: true }; 
                }  
                return { ...icon, isSelected: false };
            }
            )
        );
        setOpenIconWindow(false);
    }

    return (
        <div className="flex flex-wrap gap-2 text-orange-600 p-3">
            {allIconsData.map((singleIcon, index ) => (
                <div
                    key={index}
                    onClick={() => handleTheIconSelection(singleIcon)}
                    className={`w-9 h-9  shadow-sm border-slate-50 flex items-center
                        
                        justify-center rounded-lg hover:bg-orange-600 hover:text-white
                        ${
                            singleIcon.isSelected
                                ? "bg-orange-600    text-white"
                                :   " bg-white  text-orange-600"
                        }`}
                    >
                        {singleIcon.icon}
                </div>
            ))}
        </div>
    );
}
