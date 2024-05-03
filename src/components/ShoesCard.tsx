import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Input,
    Button,
  } from "@nextui-org/react";
  import { useState } from "react";
  import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";
  import { getShoesData } from "../api/actions";
import { RiMoneyPoundBoxFill } from "react-icons/ri";
import { PiSneaker } from "react-icons/pi";
  
  const WeatherCard: React.FC = () => {
    const [data, setData] = useState<ShoesData>();
    const [loadingState, setLoadingState] = useState(false);
    const [brand, setBrand] = useState("");
    const [error, setError] = useState("");
    const [price, setPrice] = useState("");
  
    const handleSearch = () => {
      console.log("Fetching Price Data...");
      console.log(brand);
      setLoadingState(true);
      getShoesData(brand)
        .then((res) => {
          setError("");
          if (res) {
            setData((res));
            setLoadingState(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoadingState(false);
          setData(undefined);
          setError(error);
        });
    };

    const getPriceMessage = (price: number) => {
      if (price < 500) {
        return "This is discounted price";
      } else if (price >= 500 && price <= 1000) {
        return "This is a good deal";
      } else {
        return "This price is high";
      }
    };
  
    return (
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
          >
            <div className="flex flex-col w-full p-2 space-y-4">
              <Input
                id="brand"
                type="text"
                label="Brand"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                }}
              />
              <Button
                className=""
                color="primary"
                isLoading={loadingState}
                type="submit"
              >
                Search
              </Button>
            </div>
            
          </form>
        </CardHeader>
        <Divider />
        {data ? (
          <CardBody>
          <div className="flex flex-col px-5">
            <h1 className="text-3xl font-bold">{data.brand}</h1>
            <p className="text-lg font-medium mt-2 flex gap-2">
              <RiMoneyPoundBoxFill size={20} className="mt-1" /> {data.price}
            </p>
            <p className="text-lg font-medium mt-2">{getPriceMessage(data.price)}</p>
            <p className="text-lg font-medium flex mt-2 gap-2">
              <div
                className="h-5 w-5 rounded-full mt-1"
                style={{ backgroundColor: data.color }}
              />
              {data.color}
            </p>
            <p className="text-lg font-medium flex mt-2 gap-2">
              <PiSneaker size={20} className="mt-1" /> {data.size}
            </p>
          </div>
        </CardBody>
        ) : (
          <CardBody>
            <div className="flex flex-col items-center">
              <p className="text-xl font-bold">Please enter a brand</p>
            </div>
          </CardBody>
        )}
        <Divider />
        <CardFooter>
          <div className="flex flex-col items-left">
            {error && <p className="text-xs text-red-600 ">{error}</p>}
            {data && (
              <p className="text-xs  text-gray-600 ">Last update successful.</p>
            )}
            {!data && (
              <p className="text-xs  text-gray-600 ">Waiting for input...</p>
            )}
          </div>
        </CardFooter>
      </Card>
    );
  };

  
  export default WeatherCard;
  