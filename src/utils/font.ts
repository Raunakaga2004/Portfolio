import { Qwigley } from "next/font/google";

import { Poppins } from "next/font/google";

export const qwigley = Qwigley({
  subsets: ["latin"],
  variable: "--font-qwigley",
  weight : ['400'],
  display :  "swap"
})

export const poppins = Poppins({
  subsets: ["latin"],
  weight : ["400"]
})