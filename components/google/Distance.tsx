import { currency } from "@/utils";

const commutesPerYear = 260 * 2;
const litresPerKM = 10 / 100;
const gasLitreCost = 1.5;
const litreCostKM = litresPerKM * gasLitreCost;
const secondsPerDay = 60 * 60 * 24;

type DistanceProps = {
  leg: google.maps.DirectionsLeg;
};

export const Distance =({ leg }: DistanceProps) => {
  if (!leg.distance || !leg.duration) return null;

  const days = Math.floor(
    (commutesPerYear * leg.duration.value) / secondsPerDay
  );
  const cost = currency.redond(leg.distance.value*1)
console.log( "leg", leg.distance)
  return (
    <div>
      
      <p>
        El delivery es  <span className="highlight">{leg.distance.text}</span> de distancia desde el local
        . Esto costara{" "}
        <span className="highlight">{cost}</span> el envio.
      </p>


    </div>
  );
}