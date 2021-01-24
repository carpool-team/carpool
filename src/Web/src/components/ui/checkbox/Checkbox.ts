import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import MuiCheckbox from "@material-ui/core/Checkbox";

const Checkbox = withStyles({
	root: {
		color: grey[600],
		"&$checked": {
			color: "#6b98d1",
		},
	},
	checked: {},
})(MuiCheckbox);

export default Checkbox;
