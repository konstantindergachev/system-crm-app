export const createChartConfig = (labels, label, data, color) => {
  return {
    type: 'line',
    data: {
      //Получаем данные
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
    options: {
      //Настраиваем чарт
      responsive: true,
    },
  };
};
