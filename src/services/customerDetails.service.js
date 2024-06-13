import CustomerDetails from '../models/customerDetails.model';

export const customerDetails = async (customerId,body) => {
  body.customerId = customerId;
  let customerDetails = new CustomerDetails(body);
  await customerDetails.save();
  return customerDetails;
};