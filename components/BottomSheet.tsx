import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
        <View style={styles.contentContainer}>
          <View style={styles.toggle}>
            <TouchableOpacity style={styles.toggleActive}>
              <Text style={styles.toggleActiveText}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.toggleDisable}>
              <Text style={styles.toggleDisableText}>Pickup</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
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
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 25,
  },
  toggleActiveText: {
    color: "#fff",
    fontWeight: "600",
  },
  toggleDisable: {
    padding: 8,
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
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
