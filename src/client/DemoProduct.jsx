export async function getStaticProps({ params }) {
  const page = params.page || 1;
  const pageSize = 50;
  const res = await fetch(`https://your-api/products?page=${page}&limit=${pageSize}`);
  const data = await res.json();

  return {
    props: {
      products: data.products,
      total: data.total,
      page,
      pageSize,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  // Generate paths for first few pages or dynamically based on total count
  return {
    paths: [{ params: { page: '1' } }],
    fallback: 'blocking',
  };
}


export default function ProductsPage({
  orders = [],
  statusCounts = {},
  totalAmount = 0,
  error = null,
}) {
  if (error) {
    return (
      <div className="bg-black text-white">
        <h1>Error loading orders</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <h1>All Orders</h1>

      <div>
        <h2>Order Summary</h2>
        <p>Pending: {statusCounts.pending ?? 0}</p>
        <p>Confirmed: {statusCounts.confirmed ?? 0}</p>
        <p>Cancelled: {statusCounts.cancelled ?? 0}</p>
        <p>Total Orders: {statusCounts.totalOrders ?? 0}</p>
        <p>Total Amount: ₹{totalAmount}</p>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h2>Order ID: {order.id}</h2>
              <p>Status: {order.status}</p>
              <p>Amount: ₹{order.amount}</p>
              <p>
                Placed on: {new Date(order.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
