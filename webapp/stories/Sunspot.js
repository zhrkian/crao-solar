import React from 'react'
import { storiesOf } from '@storybook/react'
import Dialog, {
  DialogContent,
  DialogContentText
} from 'material-ui/Dialog'
import Sunspot from '../src/components/Sunspot'



const sunspot = {
  "id": "59d42e9f250f7a1944123b9a",
  "number": "12671",
  "kind": "solarmonitor",
  "start_at": "2017-08-15T00:00:00.000Z",
  "end_at": "2017-08-28T00:00:00.000Z",
  "position": {
    "2017-08-15": {"theta": 11, "phi": -59, "x": -798, "y": 124},
    "2017-08-16": {"theta": 10, "phi": -47, "x": -684, "y": 89},
    "2017-08-17": {"theta": 11, "phi": -35, "x": -535, "y": 89},
    "2017-08-18": {"theta": 11, "phi": -20, "x": -319, "y": 76},
    "2017-08-19": {"theta": 11, "phi": -8, "x": -130, "y": 69},
    "2017-08-20": {"theta": 12, "phi": 6, "x": 97, "y": 85},
    "2017-08-21": {"theta": 12, "phi": 20, "x": 318, "y": 90},
    "2017-08-22": {"theta": 11, "phi": 30, "x": 467, "y": 82},
    "2017-08-23": {"theta": 10, "phi": 43, "x": 639, "y": 80},
    "2017-08-24": {"theta": 11, "phi": 57, "x": 782, "y": 117},
    "2017-08-25": {"theta": 11, "phi": 68, "x": 865, "y": 137},
    "2017-08-26": {"theta": 13, "phi": 80, "x": 911, "y": 192},
    "2017-08-27": {"theta": 14, "phi": 91, "x": 920, "y": 229},
    "2017-08-28": {"theta": 13, "phi": 91, "x": 925, "y": 213}
  },
  "hale_class": {
    "2017-08-15": "α",
    "2017-08-16": "β",
    "2017-08-17": "βγδ",
    "2017-08-18": "βγ",
    "2017-08-19": "βγ",
    "2017-08-20": "βγ",
    "2017-08-21": "βγ",
    "2017-08-22": "βγ",
    "2017-08-23": "βγ",
    "2017-08-24": "βγ",
    "2017-08-25": "βγ",
    "2017-08-26": "βγ",
    "2017-08-27": "βγ",
    "2017-08-28": "β"
  },
  "macintosh_class": {
    "2017-08-15": "Hax",
    "2017-08-16": "Eai",
    "2017-08-17": "Ehc",
    "2017-08-18": "Fkc",
    "2017-08-19": "Fkc",
    "2017-08-20": "Fkc",
    "2017-08-21": "Fkc",
    "2017-08-22": "Fkc",
    "2017-08-23": "Fsi",
    "2017-08-24": "Fsi",
    "2017-08-25": "Fsi",
    "2017-08-26": "Fai",
    "2017-08-27": "Fai",
    "2017-08-28": "Cao"
  },
  "area": {
    "2017-08-15": 70,
    "2017-08-16": 170,
    "2017-08-17": 380,
    "2017-08-18": 280,
    "2017-08-19": 410,
    "2017-08-20": 360,
    "2017-08-21": 410,
    "2017-08-22": 430,
    "2017-08-23": 250,
    "2017-08-24": 220,
    "2017-08-25": 200,
    "2017-08-26": 140,
    "2017-08-27": 120,
    "2017-08-28": 70
  },
  "sunspots_amount": {
    "2017-08-15": 2,
    "2017-08-16": 11,
    "2017-08-17": 20,
    "2017-08-18": 20,
    "2017-08-19": 31,
    "2017-08-20": 23,
    "2017-08-21": 20,
    "2017-08-22": 18,
    "2017-08-23": 18,
    "2017-08-24": 12,
    "2017-08-25": 11,
    "2017-08-26": 7,
    "2017-08-27": 5,
    "2017-08-28": 5
  },
  "flares": {
    "2017-08-15": {"C": [1.1, 1], "X": [2.9], "M": [7, 1]},
    "2017-08-18": {"C": [2.9]},
    "2017-08-19": {"C": [7, 1]},
    "2017-08-20": {"C": [2.9, 1.8]},
    "2017-08-21": {"C": [1.5, 1.5]},
    "2017-08-22": {"C": [1.9]},
    "2017-08-23": {"C": [1.9, 1.6]},
    "2017-08-24": {"C": [1.6, 3]},
    "2017-08-27": {"C": [6.3]}
  }
}

storiesOf('Sunspot', module)
  .add('initial', () => <Sunspot sunspot={sunspot} />)
  .add('modal', () => (
    <Dialog open fullScreen>
      <DialogContent>
        <Sunspot sunspot={sunspot} />
      </DialogContent>
    </Dialog>
  ))
