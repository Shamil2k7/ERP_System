import styles from "@/styles/admin.module.css";

export default function DashboardCards() {
  const cards = [
    {
      title: "Users",
      value: "1,254",
    },
    {
      title: "Products",
      value: "825",
    },
    {
      title: "Orders",
      value: "4,325",
    },
    {
      title: "Revenue",
      value: "$82,000",
    },
  ];

  return (
    <div className={styles.cardGrid}>
      {cards.map((card) => (
        <div className={styles.card} key={card.title}>
          <h4>{card.title}</h4>
          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}