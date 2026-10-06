import { Qwigley } from "next/font/google";

import { Work_Sans } from "next/font/google";

import { Sora } from "next/font/google";

export const qwigley = Qwigley({
  subsets: ["latin"],
  variable: "--font-qwigley",
  weight : ['400'],
  display :  "swap"
})

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight : ["400", "500"]
})

export const sora = Sora({
  subsets: ["latin"],
  weight : ["600", "700"]
})
