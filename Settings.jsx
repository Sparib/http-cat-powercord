const { React } = require('powercord/webpack');
const { SwitchItem } = require('powercord/components/settings');

module.exports = ({ getSetting, updateSetting, toggleSetting }) => {
    <div>
        <SwitchItem
            note="Whether to append .jpg to the url or not."
            value={getSetting('jpg', false)}
            onChange={() => toggleSetting('jpg')}
        >
            Append JPG
        </SwitchItem>
    </div>
}