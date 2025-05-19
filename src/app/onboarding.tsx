import * as React from "react";

import { View } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

import ScreenProvider from "@/components/hoc/ScreenProvider";
import { SliderItem } from "@/components/screens/onboarding/item";
import { Desc } from "@/components/screens/onboarding/Desc";
import { Pagination } from "@/components/screens/onboarding/pagination";
import { data } from "@/components/screens/onboarding/data";
import Footer from "@/components/screens/auth/footer";
import { useRouter } from "expo-router";
import { ROUTES } from "@/routes";

function Onboarding() {
  const router = useRouter();
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll(event) {
      scrollX.value = event.contentOffset.x;
    },
  });

  return (
    <ScreenProvider>
      <View className="my-8">
        <Animated.FlatList
          data={data}
          renderItem={({ item, index }) => (
            <SliderItem scrollX={scrollX} index={index} />
          )}
          keyExtractor={({ id }) => id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={scrollHandler}
          bounces={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          // display edge of next/prev items
          removeClippedSubviews={false}
        />
        <Desc scrollX={scrollX} />
        <Pagination scrollX={scrollX} />
        <View className="px-8 mt-8">
          <Footer
            backHandler={() => router.dismiss()}
            nextHandler={() => router.push('404')}
          />
        </View>
      </View>
    </ScreenProvider>
  );
}

export default Onboarding;
