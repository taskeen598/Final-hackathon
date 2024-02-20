// import LogoDark from "../../assets/images/logos/xtremelogo.svg";
const LogoDark: any = require("../../assets/images/logos/xtremelogo.svg");

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <a>
        <Image src={LogoDark} alt="logo" width={100} height={100} />
      </a>
    </Link>
  );
};

export default Logo;
