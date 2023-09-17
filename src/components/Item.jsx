import { formatBlanks, getRandomColor, isObject } from "../util/helper";

import styles from "./Item.module.css";

function Item({ item }) {
  const [arr] = Object.entries(item);
  const randomColor = getRandomColor();

  return (
    <li
      className={styles.layout}
      style={{
        backgroundColor: randomColor.backgroundColor,
        color: randomColor.color,
        boxShadow: `inset 0 0 0 0.2rem ${randomColor.color}`,
      }}
    >
      <span className={styles.property}>{arr[0]}</span>
      {isObject(arr[1] || Array.isArray(arr[1])) ? (
        <SubProperties item={arr[1]} isArray={Array.isArray(arr[1])} />
      ) : (
        <p className={styles.value}>{formatBlanks(arr[1])}</p>
      )}
    </li>
  );
}

function SubProperties({ isArray = false, item }) {
  const key = !isArray && Object.keys(item)[0];
  const childrenAreIterative =
    (isArray && isObject(item[1])) ||
    (isArray && Array.isArray(item[1])) ||
    (!isArray && isObject(item[key])) ||
    (!isArray && Array.isArray(item[key]));
  const children =
    childrenAreIterative && isArray
      ? item[1]
      : childrenAreIterative && !isArray
      ? item[key]
      : null;
  let layout;

  if (isArray) {
    layout = item.map((i) => {
      return (
        <div key={crypto.randomUUID()}>
          <span>{formatBlanks(i[0])}</span>

          {childrenAreIterative ? (
            Object.entries(children).map((el) => {
              if (!el) return null;
              return <SubProperties key={crypto.randomUUID()} item={el} />;
            })
          ) : (
            <div
              key={formatBlanks(item[0])}
              className={styles[`property__container`]}
            >
              <p className={styles.subproperty}>{formatBlanks(i?.at(1))}</p>
              <p className={styles.subproperty}>{formatBlanks(i?.at(0))}</p>
            </div>
          )}
        </div>
      );
    });
  }
  if (isObject(item)) {
    layout = Object.entries(item).map((i) => {
      const keyIterative = isObject(i[1]) || Array.isArray(i[1]);
      return (
        <div key={i[0]} className={styles[`property__container`]}>
          <span className={styles.value}>{formatBlanks(i[0])}</span>
          {childrenAreIterative
            ? Object.entries(children).map((el) => {
                if (!el) return null;
                return (
                  <SubProperties
                    key={crypto.randomUUID()}
                    item={el}
                    isArray={Array.isArray(el)}
                  />
                );
              })
            : (keyIterative &&
                Array.isArray(i[1]) &&
                i[1].map((itVal) => (
                  <span key={crypto.randomUUID} className={styles.property}>
                    {formatBlanks(itVal[1])}
                  </span>
                ))) ||
              (keyIterative && isObject(i[1]) && (
                <SubProperties item={i[1]} />
              )) || <p className={styles.subproperty}>{formatBlanks(i[1])}</p>}
        </div>
      );
    });
  }

  return layout;
}

export default Item;
