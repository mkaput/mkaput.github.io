import GitHubIcon from "../assets/icons/github.svg";
import XIcon from "../assets/icons/x.svg";
import LinkedInIcon from "../assets/icons/linkedin.svg";
import SwmansionIcon from "../assets/icons/swmansion.svg";

export type Service = keyof typeof services;

export const services = {
  github: {
    label: "GitHub",
    Icon: GitHubIcon,
  },
  x: {
    label: "X",
    Icon: XIcon,
  },
  linkedin: {
    label: "LinkedIn",
    Icon: LinkedInIcon,
  },
  swmansion: {
    label: "Software Mansion Blog",
    Icon: SwmansionIcon,
  },
} as const;

export const serviceIds = Object.keys(services) as [Service, ...Service[]];
