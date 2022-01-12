import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import IpMessage from "./IpMessage";

export interface DataProps {
  ip: string;
  as: { domain: string; type: string };
  isp: string;
  location: {
    country: string;
    region: string;
    timezone: string;
  };
}

const IpButton = () => {
  const [open, setOpen] = useState(false);
  const [ipData, setIpData] = useState<DataProps>({
    ip: "",
    as: {
      domain: "",
      type: "",
    },
    isp: "",
    location: {
      country: "",
      region: "",
      timezone: "",
    },
  });

  const handleClick = () => setOpen((prev) => !prev);

  const getIp = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    setIpData(data);
  };

  useEffect(() => {
    getIp();
    return () => {
      setIpData({
        ip: "",
        as: {
          type: "",
          domain: "",
        },
        isp: "",
        location: {
          country: "",
          region: "",
          timezone: "",
        },
      });
    };
  }, []);

  return (
    <Fragment>
      <Button
        aria-controls="ip-message"
        aria-expanded={open}
        onClick={handleClick}
        variant="outline-info"
      >
        What's my IP?
      </Button>
      <Collapse in={open}>
        <div id="ip-message">
          <IpMessage {...ipData} />
        </div>
      </Collapse>
    </Fragment>
  );
};

export default IpButton;
