import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Jobs from '../src/components/Jobs'

storiesOf('Jobs', module)
  .add('Job', () => (
    <Jobs />
  ))
