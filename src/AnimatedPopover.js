import React from "react";
import { StyleSheet, Animated, ScrollView, View } from "react-native";
import Indicator from "./Indicator";

const OPEN_DURATION = 300;
const CLOSE_DURATION = 300;

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedIndicator = Animated.createAnimatedComponent(Indicator);

export default class MatchCard extends React.Component {
  state = {
    isOpen: this.props.alwaysOpen ? true : false,
    height: this.props.alwaysOpen
      ? new Animated.Value(this.props.openHeight)
      : new Animated.Value(this.props.closedHeight),
    indicatorWidth: 0,
    scrollViewWidth: 0,
    popoverOpacity: this.props.alwaysOpen
      ? new Animated.Value(1)
      : new Animated.Value(0),
    index: this.props.defaultIndex,
    scrollOffset: new Animated.Value(0),
  };

  open = (index = 0) => {
    this.scrollTo(index);
    if (!this.props.alwaysOpen) {
      this.setState({ isOpen: true });

      Animated.parallel([
        Animated.timing(this.state.height, {
          toValue: this.props.openHeight,
          duration: OPEN_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.popoverOpacity, {
          toValue: 1,
          duration: OPEN_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  close = () => {
    if (!this.props.alwaysOpen) {
      this.setState({ isOpen: false });

      Animated.parallel([
        Animated.timing(this.state.height, {
          toValue: this.props.closedHeight,
          duration: CLOSE_DURATION,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.popoverOpacity, {
          toValue: 0,
          duration: CLOSE_DURATION,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  toggle = (index = 0) => {
    this.scrollTo(index);
    if (!this.props.alwaysOpen) {
      if (this.state.isOpen) {
        if (index == this.state.index) this.close();
      } else {
        this.open(index);
      }
    }
    this.setState({ index: index });
  };

  onScroll = (event) => {
    indicatorPosition =
      (0.2 *
        event.nativeEvent.contentOffset.x *
        (event.nativeEvent.layoutMeasurement.width -
          2 * this.props.contentStyle.paddingHorizontal)) /
      event.nativeEvent.layoutMeasurement.width;

    Animated.timing(this.state.scrollOffset, {
      toValue: indicatorPosition,
      duration: 0,
      useNativeDriver: true,
    }).start();
  };

  scrollTo = (index) => {
    const animatedScroll = this.state.isOpen;
    this.ScrollView.scrollTo({
      x: index * this.state.scrollViewWidth,
      animated: animatedScroll,
    });
  };

  onIndicatorLayout = (event) => {
    const indicatorWidth =
      (event.nativeEvent.layout.width -
        2 * this.props.contentStyle.paddingHorizontal) /
      5;
    this.setState({ indicatorWidth: indicatorWidth });
  };

  onScrollViewLayout = (event) => {
    const scrollViewWidth = event.nativeEvent.layout.width;
    this.setState({ scrollViewWidth: scrollViewWidth });
  };

  render = () => {
    return (
      <AnimatedView
        onLayout={this.props.onLayout}
        style={[
          styles.container,
          { height: this.state.height },
          this.props.style,
        ]}
      >
        <View style={this.props.contentStyle}>{this.props.children}</View>
        <AnimatedView
          style={[styles.popover, { opacity: this.state.popoverOpacity }]}
        >
          <View
            style={[
              styles.indicatorContainer,
              { paddingHorizontal: this.props.contentStyle.paddingHorizontal },
            ]}
            onLayout={this.onIndicatorLayout}
          >
            <AnimatedIndicator
              style={[
                styles.indicator,
                {
                  maxWidth: this.state.indicatorWidth,
                  transform: [{ translateX: this.state.scrollOffset }],
                },
              ]}
              color={this.props.indicatorColor}
            />
          </View>
          <View style={styles.scollView}>
            <ScrollView
              ref={(ref) => (this.ScrollView = ref)}
              onLayout={this.onScrollViewLayout}
              onScroll={this.onScroll}
              scrollEventThrottle={16}
              centerContent={true}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
            >
              {this.props.popover(this.state.index)}
            </ScrollView>
          </View>
        </AnimatedView>
      </AnimatedView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
  },
  popover: {
    marginBottom: 12,
    marginTop: 12,
  },
  indicatorContainer: {
    backgroundColor: "white",
    height: 10,
    marginTop: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -5 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 3,
  },
  indicator: {
    top: -10,
  },
  scollView: { alignItems: "center", flexGrow: 1 },
});

MatchCard.defaultProps = {
  closedHeight: 127,
  openHeight: 348,
  alwaysOpen: false,
  defaultIndex: 0,
  contentStyle: { paddingHorizontal: 8 },
  indicatorColor: "white",
};
