# React Native Group Button

This is a React Native library that provides the ability to create grouped buttons. With this library, you can create buttons with custom shapes, sizes, and colors and also add icons and text to the buttons.

## Installation

To install the library, run the following command:

```bash
npm install react-native-group-button
```

## Usage

Import the library in your project:

```javascript
import GroupButton from 'react-native-group-button';
```

Then, you can use the `GroupButton` component to create a group of buttons:

```javascript
<GroupButton
  onPress={(index) => console.log(`Button ${index} pressed`)}
  buttons={[
    { label: 'Button 1', icon: require('./button1.png') },
    { label: 'Button 2', icon: require('./button2.png') },
    { label: 'Button 3', icon: require('./button3.png') },
  ]}
/>
```

## Props

- `buttons`: An array of objects, each object representing a button. Each button object can have the following properties:
  - `label` (required): The label of the button.
  - `icon`: The icon of the button.
  - `color`: The background color of the button.
  - `textColor`: The text color of the button.
  - `disabled`: Whether the button is disabled or not.
- `onPress` (required): A function that is called when a button is pressed. The function takes the index of the pressed button as an argument.
- `containerStyle`: The style object for the container of the buttons.
- `buttonStyle`: The style object for the buttons.
- `activeButtonStyle`: The style object for the active button.
- `activeTextStyle`: The style object for the text of the active button.
- `disabledButtonStyle`: The style object for the disabled button.
- `disabledTextStyle`: The style object for the text of the disabled button.

## License

This library is released under the MIT License. See LICENSE for details.
