/**
 * Hàm sinh khối _links (HATEOAS) dựa trên thông tin đơn hàng và trạng thái (status).
 * Tách biệt hoàn toàn logic xây dựng hyperlink khỏi controller/route.
 */
const generateOrderLinks = (order) => {
    const links = {
        self: {
            href: `/api/v2/orders/${order.id}`,
            method: "GET"
        },
        customer: {
            href: `/api/v2/users/${order.userId}`,
            method: "GET"
        }
    };

    // Nếu đơn hàng đang ở trạng thái "pending", client có quyền hủy đơn -> Thêm link cancel
    if (order.status === "pending") {
        links.cancel = {
            href: `/api/v2/orders/${order.id}/cancellation`,
            method: "POST"
        };
    }
    // Nếu status là "cancelled", link cancel sẽ tự động bị bỏ hẳn theo yêu cầu

    return links;
};

module.exports = {
    generateOrderLinks
};