import React from "react";
import { useNavigation } from "expo-router";
import {
  Button,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { COLORS } from "@/constants/colors";
import categories from "@/data/filter.json";

interface Category {
  name: string;
  count: number;
  checked?: boolean;
}

const FilterPageModal = () => {
  const navigation = useNavigation();

  const [items, setItems] = React.useState<Category[]>(categories);
  const [selected, setSelected] = React.useState<Category[]>([]);

  const handleChangeCheckbox = (index: number) => {
    const isChecked = items[index].checked;

    const updatedItems = items.map((item) => {
      if (item.name === items[index].name) {
        item.checked = !isChecked;
      }

      return item;
    });

    setItems(() => updatedItems);
  };

  const handleClearAll = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;

      return item;
    });

    setItems(() => updatedItems);
  };

  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  const animatedButtonStyles = useAnimatedStyle(() => ({
    width: flexWidth.value,
    display: flexWidth.value === 0 ? "none" : "flex",
  }));
  const animatedButtonTextStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  React.useEffect(() => {
    const hasSelected = !!selected.length;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = !!selectedItems.length;

    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View style={styles.row}>
      <View style={styles.itemText}>
        <Text>{item.name}</Text>
        <Text style={styles.itemTextCount}>({item.count})</Text>
      </View>
      <BouncyCheckbox
        fillColor={COLORS.primary}
        unfillColor="#fff"
        disableBuiltInState
        iconStyle={styles.checkbox}
        innerIconStyle={styles.checkbox}
        isChecked={items[index].checked}
        onPress={() => handleChangeCheckbox(index)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={items}
          renderItem={renderItem}
          ListHeaderComponent={
            <>
              <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.item}>
                  <Ionicons
                    name="arrow-down-outline"
                    size={20}
                    color={COLORS.medium}
                  />
                  <Text style={{ flex: 1 }}>Sort</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                  <Ionicons
                    name="fast-food-outline"
                    size={20}
                    color={COLORS.medium}
                  />
                  <Text style={{ flex: 1 }}>Hygiene rating</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                  <Ionicons
                    name="pricetag-outline"
                    size={20}
                    color={COLORS.medium}
                  />
                  <Text style={{ flex: 1 }}>Offers</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.item, { borderBottomWidth: 0 }]}
                >
                  <Ionicons
                    name="nutrition-outline"
                    size={20}
                    color={COLORS.medium}
                  />
                  <Text style={{ flex: 1 }}>Dietary</Text>
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.header}>Categories</Text>
            </>
          }
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Animated.View style={[styles.outlineButton, animatedButtonStyles]}>
            <TouchableOpacity onPress={handleClearAll}>
              <Animated.Text
                style={[styles.outlineButtonText, animatedButtonTextStyles]}
              >
                Clear All
              </Animated.Text>
            </TouchableOpacity>
          </Animated.View>

          <TouchableOpacity
            style={styles.fullButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FilterPageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    paddingTop: 0,
    backgroundColor: COLORS.lightGrey,
  },
  flatListContainer: {
    marginBottom: 80,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  fullButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    height: 56,
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    gap: 20,
    paddingVertical: 10,
    borderColor: COLORS.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  itemTextCount: {
    color: COLORS.medium,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  checkbox: {
    borderColor: COLORS.primary,
    borderRadius: 4,
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  outlineButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 56,
  },
  outlineButtonText: {
    color: COLORS.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});
