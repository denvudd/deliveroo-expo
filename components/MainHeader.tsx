import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import BottomSheet from "./BottomSheet";
import { COLORS } from "@/constants/colors";

const MainHeader = () => {
  const bottomSheetRef = React.useRef<BottomSheetModal | null>(null);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <SafeAreaView style={styles.safeAreView}>
      <BottomSheet ref={bottomSheetRef} />
      <View style={styles.container}>
        <TouchableOpacity onPress={openBottomSheet}>
          <Image
            style={styles.bikeLogo}
            source={require("@/assets/images/bike.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.titleContainer}
          onPress={openBottomSheet}
        >
          <Text style={styles.title}>Delivery • Now</Text>
          <View style={styles.location}>
            <Text style={styles.subTitle}>Selected Location</Text>
            <Ionicons name="chevron-down" size={20} color={COLORS.primary} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileBtn}>
          <Ionicons name="person-outline" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
          <View style={styles.searchField}>
            <Ionicons
              style={styles.searchIcon}
              name="search-outline"
              size={20}
              color={COLORS.medium}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Restaurants, groceries, dishes"
            />
          </View>
          <Link href={"/(modal)/filter"} asChild>
            <TouchableOpacity style={styles.optionButton}>
              <Ionicons
                name="options-outline"
                size={20}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainHeader;

const styles = StyleSheet.create({
  safeAreView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    gap: 20,
    paddingHorizontal: 20,
  },
  bikeLogo: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: COLORS.medium,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  profileBtn: {
    backgroundColor: COLORS.lightGrey,
    padding: 10,
    borderRadius: 50,
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  searchContainer: {
    height: 60,
    backgroundColor: "#fff",
  },
  optionButton: {
    padding: 10,
    borderRadius: 50,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  searchField: {
    flex: 1,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    padding: 10,
    color: COLORS.mediumDark,
  },
  searchIcon: {
    paddingLeft: 10,
  },
});
