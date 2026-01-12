import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckoutFormState } from "../action";

type Props = {
  state: CheckoutFormState;
};

const FormInputs = ({ state }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>Enter your billing details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {state.formErrors && state.formErrors.length > 0 && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {state.formErrors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              className="border-2 border-gray-300"
              type="text"
              required
            />
            {state.errors?.firstName && (
              <p className="text-sm text-destructive">
                {state.errors.firstName[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              className="border-2 border-gray-300"
              type="text"
              placeholder="Doe"
              required
            />
            {state.errors?.lastName && (
              <p className="text-sm text-destructive">
                {state.errors.lastName[0]}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            className="border-2 border-gray-300"
            type="email"
            placeholder="john@example.com"
            required
          />
          {state.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email[0]}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            className="border-2 border-gray-300"
            type="text"
            placeholder="123 Main St"
            required
          />
          {state.errors?.address && (
            <p className="text-sm text-destructive">
              {state.errors.address[0]}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              name="city"
              className="border-2 border-gray-300"
              type="text"
              placeholder="New York"
              required
            />
            {state.errors?.city && (
              <p className="text-sm text-destructive">{state.errors.city[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              name="state"
              className="border-2 border-gray-300"
              type="text"
              placeholder="NY"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input
              id="zip"
              name="zip"
              className="border-2 border-gray-300"
              type="text"
              placeholder="10001"
              required
            />
            {state.errors?.zip && (
              <p className="text-sm text-destructive">{state.errors.zip[0]}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormInputs;
