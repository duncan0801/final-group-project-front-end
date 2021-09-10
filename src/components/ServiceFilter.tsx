import React from "react";
import {
	createStyles,
	makeStyles,
	useTheme,
	Theme,
} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import useStore from "../store";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			maxWidth: 300,
		},
		chips: {
			display: "flex",
			flexWrap: "wrap",
		},
		chip: {
			margin: 2,
		},
		noLabel: {
			marginTop: theme.spacing(3),
		},
	})
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const services = [
	"Anxiety",
	"Depression",
	"Addiction",
	"ADHD",
	"Anger management",
	"Bereavement",
	"Bullying",
	"Cancer",
	"Child related issues",
	"Depression",
	"Discrimination",
	"Drug addiction",
	"Panic attacks",
	"Postnatal depression",
	"Relationship problems",
	"Separation and divorce",
	"Stress",
	"Trauma",
];

//   function getStylesForServices(name: string, theme: Theme, serviceName?: string[]|string ) {
//       if (serviceName) {
//         return {
//           fontWeight:
//         serviceName.indexOf(name) === -1
//           ? theme.typography.fontWeightRegular
//           : theme.typography.fontWeightMedium
//         }
//     };

// }

function getStylesForServices(
	name: string,
	serviceName: string[],
	theme: Theme
) {
	return {
		fontWeight:
			serviceName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

function ServiceFilter() {
	// const [serviceName, setServiceName] = React.useState<string[]>([]);
	const counsellorsByService = useStore(
		(state) => state.filterCounsellorsByService
	);
	const counsellors = useStore((state) => state.counsellors);
	const serviceName = useStore((state) => state.serviceName);
	const setServiceName = useStore((state) => state.setServiceName);

	const classes = useStyles();
	const theme = useTheme();

	// console.log("ServiceFilter serviceName", serviceName)

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setServiceName(event.target.value as string[]);

		const filteredCounsellers = counsellorsByService();
		console.log("filtered", filteredCounsellers);
		return filteredCounsellers;
	};

	// console.log("counsellors", counsellors);
	// console.log("selected services", serviceName);

	// console.log("services", filteredCounsellers);

	return (
		<FormControl className={classes.formControl}>
			<InputLabel id="demo-mutiple-chip-label">Services</InputLabel>
			<Select
				labelId="demo-mutiple-chip-label"
				id="demo-mutiple-chip"
				multiple
				value={serviceName}
				onChange={handleChange}
				input={<Input id="select-multiple-chip" />}
				renderValue={(selected) => (
					<div className={classes.chips}>
						{(selected as string[]).map((value) => (
							<Chip
								key={value}
								label={value}
								className={classes.chip}
							/>
						))}
					</div>
				)}
				MenuProps={MenuProps}
			>
				{services.map((service) => (
					<MenuItem key={service} value={service}>
						{service}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export default ServiceFilter;
