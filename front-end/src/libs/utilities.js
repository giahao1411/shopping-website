export function formatMoney(amount) {
    if (isNaN(amount)) {
        throw new Error("Invalid input: amount must be a number.");
    }
    return `$${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

export function formatNumber(amount) {
    if (isNaN(amount)) {
        throw new Error("Invalid input: amount must be a number.");
    }

    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Hàm để định dạng ngày
export function formatDate(date) {
    if (!date) return "N/A";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
}

export const mapCoupons = async (coupons) => {
  return coupons.map((coupon) => {
    return {
      ...coupon,
      name: coupon.name || "No name",  // Thêm trường name
      type: coupon.type || "No type",  // Thêm trường type
    };
  });
};
