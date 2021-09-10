import React from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
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

const languages = [
    "English",
      "Spanish",
      "French",
      "Italian",
      "Russian",
      "Portuguese",
      "German",
      "Korean",
  ];

  function getStylesForLanguages(name: string, languageName: string[], theme: Theme) {
    return {
      fontWeight:
        languageName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }


function LanguageFilter() {
    const classes = useStyles();
    const theme = useTheme();
    const [languageName, setLanguageName] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguageName(event.target.value as string[]);
    };

    return(<FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Languages</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={languageName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {languages.map((language) => (
            <MenuItem key={language} value={language} style={getStylesForLanguages(language, languageName, theme)}>
              {language}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    )
}

export default LanguageFilter