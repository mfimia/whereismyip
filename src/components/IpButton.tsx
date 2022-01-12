import { Fragment, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import IpMessage from "./IpMessage";

export interface DataProps {
  readonly ip: string;
  readonly as: { readonly domain: string; readonly type: string };
  readonly isp: string;
  readonly location: {
    readonly country: string;
    readonly region: string;
    readonly timezone: string;
  };
}

const IpButton: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
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

  const handleClick = () => setOpen((prev): boolean => !prev);

  const getIp = async (): Promise<void> => {
    const res: Response = await fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data: any = await res.json();
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
