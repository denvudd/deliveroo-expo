import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";

import { COLORS } from "@/constants/colors";

interface BottomSheetProps {}

const BottomSheet = React.forwardRef<BottomSheetModal>(
  (props: BottomSheetProps, ref) => {
    const snapPoints = React.useMemo(() => ["50%"], []);
    const { dismiss } = useBottomSheetModal();

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        handleIndicatorStyle={{ display: "none" }}
        backgroundStyle={styles.sheetModal}
        overDragResistanceFactor={0}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
      >
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.toggle}>
              <TouchableOpacity style={styles.toggleActive}>
                <Text style={styles.toggleActiveText}>Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.toggleDisable}>
                <Text style={styles.toggleDisableText}>Pickup</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.subHeader}>Your ocation</Text>
            <Link href={`/`} asChild>
              <TouchableOpacity>
                <View style={styles.item}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={COLORS.medium}
                  />
                  <Text style={{ flex: 1 }}>Current Location</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>
              </TouchableOpacity>
            </Link>

            <Text style={styles.subHeader}>Arrival Time</Text>
            <Link href={`/`} asChild>
              <TouchableOpacity>
                <View style={styles.item}>
                  <Ionicons
                    name="stopwatch-outline"
                    size={20}
                    color={COLORS.medium}
                  />
                  <Text style={{ flex: 1 }}>Now</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.primary}
                  />
                </View>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </BottomSheetModal>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 32,
  },
  toggleActive: {
    backgroundColor: COLORS.primary,
    padding: 4,
    borderRadius: 32,
    paddingHorizontal: 25,
  },
  toggleActiveText: {
    color: "#fff",
    fontWeight: "600",
  },
  toggleDisable: {
    padding: 4,
    borderRadius: 32,
    paddingHorizontal: 25,
  },
  toggleDisableText: {
    color: COLORS.primary,
    fontWeight: "600",
  },
  sheetModal: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 0,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 4,
    margin: 16,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 8,
    padding: 16,
    borderColor: COLORS.grey,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
