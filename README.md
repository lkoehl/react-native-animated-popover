# react-native-animated-popover
A simple container to create an animated popover in React Native


## Installation
Using yarn:
```
yarn add react-native-animated-popover
```

Using npm:
```
npm install react-native-animated-popover
```

## Props

| name | description | default |
|------|-------------|---------|
| closedHeight | Height of the container when closed | 127 |
| openHeight | Height of the container when opened | 348 |
| alwaysOpen | Container stay open all the time | false |
| defaultIndex | Index for the `ScrollView`. Shows content when no other index is profided | 0 |
| style | Style for the outermost container | |
| contentStyle | Style for the content | `{paddingHorizontal: 8}`|
| indicatorColor | Color of the indicator | white |
| onLayout | Function gets called by `onLayout` of outermost container | |
| popover | Components to be rendered inside the popover | |


## Methods
| name | description |
|------|-------------|
| open(index) | Opens the popover at index. Defaults to 0 |
| close | Closes the popover |
| toggle(index) | Toggles the state of the popover. Index defaults to 0 |
