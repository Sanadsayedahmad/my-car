// validation check for card creation form

const getElemVal = (id) => document.getElementById(id).value;

export default function cardCreationHelper(
  bizName,
  bizDescription,
  bizAddress,
  bizPhone,
  bizPrice,
  bizImage,
  imageURL
) {
  // errors object
  let errors = {
    name: "",
    description: "",
    phone: "",
    address: "",
    price: "",
    image: "",
    iserror: "",
  };

  // card data
  let data = {
    bizName: getElemVal(bizName),
    bizDescription: getElemVal(bizDescription),
    bizAddress: getElemVal(bizAddress),
    bizPhone: getElemVal(bizPhone),
    bizPrice: getElemVal(bizPrice),
    bizImage: "",
  };
  if (bizImage.lenght > 0 && getElemVal(imageURL).length > 0) {
    errors.image = `* please choose only one method to upolad image`;
  }
  if (bizImage.length == 0 && getElemVal(imageURL).length == 0) {
    data.bizImage =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  } else {
    data.bizImage = bizImage.length > 0 ? bizImage : getElemVal(imageURL);
  }

  if (data.bizName.length < 2 || data.bizName.length > 20) {
    errors.name = `*business name length must be at least 2 characters long and max 20`;
  }

  if (data.bizDescription.length < 2) {
    errors.description = `* business description length must be at least 2 characters long`;
  }
  if (data.bizAddress.length < 2 || data.bizAddress.length > 20) {
    errors.address = `* business Address length must be at least 2 characters long  and max 20`;
  }
  if (data.bizPhone.length < 9) {
    errors.phone = `* business Phone length must be at least 9 characters long and match the required pattern: /^0[2-9]\d{7,8}$/ *`;
  }

  let reg = /^\d+$/;
  let res = reg.test(data.bizPrice);
  if (!res) {
    errors.price = `* plaese enter a numeric number`;
  }
  if (data.bizPrice === "") {
    errors.price = `* car price is required`;
  }
  // check if all the errors values is empty
  if (Object.values(errors).every((o) => o === "")) {
    return data;
  } else {
    return errors;
  }
}
