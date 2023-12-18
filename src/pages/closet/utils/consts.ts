import { ReactComponent as ClosetGrab0 } from '../../../assets/closet_grab_0.svg'
import { ReactComponent as ClosetGrab1 } from '../../../assets/closet_grab_1.svg'
import { ReactComponent as ClosetGrab2 } from '../../../assets/closet_grab_2.svg'
import { ReactComponent as ClosetGrab3 } from '../../../assets/closet_grab_3.svg'
import { ReactComponent as ClosetGrab4 } from '../../../assets/closet_grab_4.svg'
import { ReactComponent as ClosetGrab5 } from '../../../assets/closet_grab_5.svg'
import { ReactComponent as CreateClosetEllipseIcon } from '../../../assets/closet_create_ellipse.svg'
import { FunctionComponent, SVGProps } from 'react'

export type CoverBoxColorKey = 'PURPLE' | 'RED' | 'ORANGE' | 'BLUE' | 'GREEN' | 'GRAY' | 'DEFAULT'

export type CoverBoxBackgroundConfig = {
  background: string
  grab: FunctionComponent<SVGProps<SVGSVGElement>>
  nameTag?: {
    background: string
  }
}

export const DEFAULT_COVER_COLOR_SET: Record<CoverBoxColorKey, CoverBoxBackgroundConfig> = {
  PURPLE: {
    background: '#EDE9FF',
    grab: ClosetGrab0,
    nameTag: {
      background: ' linear-gradient(91.93deg, #B29EFF 8.2%, #653FFF 96.24%)',
    },
  },
  RED: {
    background: ' #FFEDE3',
    grab: ClosetGrab1,
    nameTag: {
      background: 'linear-gradient(91.93deg, #FDB790 8.2%, #FF067E 96.24%)',
    },
  },
  ORANGE: {
    background: '#FFF2D9',
    grab: ClosetGrab2,
    nameTag: {
      background: 'linear-gradient(91.93deg, #FFC046 8.2%, #FF70E8 96.24%)',
    },
  },
  GREEN: {
    background: '#D9FCE3',
    grab: ClosetGrab4,
    nameTag: {
      background: 'linear-gradient(91.93deg, #38DC65 8.2%, #10B6D7 96.24%)',
    },
  },
  BLUE: {
    background: '#CDF8FD',
    grab: ClosetGrab3,
    nameTag: {
      background: 'linear-gradient(91.93deg, #13CBE0 8.2%, #C039FF 96.24%)',
    },
  },
  GRAY: {
    background: ' #E6EEEE',
    grab: ClosetGrab5,
    nameTag: {
      background: 'linear-gradient(91.93deg, #849191 8.2%, #313639 96.24%)',
    },
  },
  DEFAULT: {
    background: '#FFFFFF',
    grab: CreateClosetEllipseIcon,
  },
} as const
