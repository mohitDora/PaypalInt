import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAuth, signOut } from 'firebase/auth';
import { Button } from "./components/ui/button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { getFirestore } from "firebase/firestore";
import app from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Input } from "./components/ui/input";
import { Checkbox } from "./components/ui/checkbox";

function CardLayout() {
  const [orderAmount, setOrderAmount] = useState(1); // Initial order amount
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [clicked, setClicked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    if (!isChecked) {
      setOrderAmount(1)
      setClicked(true)
    }
  }, [isChecked])
  const applyCoupon = () => {

    if (couponCode === 'DISCOUNT20' && clicked) {
      const discountedAmount = orderAmount * 0.8;
      setOrderAmount(discountedAmount);
      setCouponMsg("Code Applied")
      setClicked(false)
    }
    if (couponCode !== 'DISCOUNT20') {
      setOrderAmount(1)
      setClicked(true)
      setCouponMsg("Invalid Code")
    }
  };
  const db = getFirestore(app);
  const initialOptions = {
    "client-id": "AUf6Jh8viomIa90m8KMFndz2iIwKkIcpzZHTUmKY1f8M9J7uDeQ1zO7d-lTb85AU4oiBHBlb2mBZ9g9_"
  };
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
          console.log("Logout Success")
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };
  const createOrder = (data, actions) => {
    console.log(isChecked)
    const calculatedOrderAmount = isChecked ? orderAmount : 1;
    console.log(calculatedOrderAmount)
    return actions.order.create({
      purchase_units: [
        {
          amount: {

            value: calculatedOrderAmount.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const details = await actions.order.capture();
      alert("Transaction completed by " + details.payer.name.given_name);

      await addDoc(collection(db, "payments"), {
        payer: details?.payer.name.given_name,
        amount: details?.purchase_units[0].amount.value,
        currency: details?.purchase_units[0].amount.currency_code,
        timestamp: db?.firestore.FieldValue.serverTimestamp(),
      });

      console.log("Transaction details saved to Firestore");
    } catch (error) {
      console.error("Error saving transaction details: ", error);
    }
  };

  return (
    <>
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>product</CardTitle>
          <CardDescription>Quality meets affordability with our latest offering.
            This versatile product is designed to simplify your life.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-1">
            <Checkbox id="terms" checked={isChecked} onCheckedChange={handleCheckboxChange} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Have Coupon?
            </label>
          </div>
          {
            isChecked ?
              <>
                <div className="flex items-center gap-1">
                  <Input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                  <Button onClick={applyCoupon}>Apply Coupon</Button></div><p>{couponMsg}</p></> : ""
          }
          <p>Order Amount: ${orderAmount.toFixed(2)}</p>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
          </PayPalScriptProvider>
        </CardContent>
      </Card>
      <p>Coupon code : DISCOUNT20</p>
      <Button onClick={handleLogout}>Sign out</Button>
    </>
  )
}

export default CardLayout