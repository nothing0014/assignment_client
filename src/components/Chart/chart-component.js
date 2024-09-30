import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SearchService from "../../sevices/search.service";
import { PieChart } from "@mui/x-charts/PieChart";

const Chart = ({ show, setShow }) => {
  const [chartData, setchartData] = useState("[]"); // 顯示於圖表上的資料
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    SearchService.searchTeam15()
      .then((data) => {
        //將資料轉換成 <Piechart>可以接受的格式
        const pieChartData = data.data.map((item, index) => ({
          id: index,
          value: item.player_count,
          label: item.team_name,
        }));
        setchartData(pieChartData);
      })
      .catch((error) => {
        console.error("搜尋時發生錯誤:", error);
      });
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Show Charts
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PieChart
            series={[
              {
                data: chartData,
              },
            ]}
            width={800}
            height={400}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Chart;
