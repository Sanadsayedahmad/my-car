import { Container } from "react-bootstrap";

function AboutPage() {
  return (
    <Container>
      <p className={"text-center display-3"}>about Us</p>
      <h5>
        <li>
          My-Car is a place where you can easily sell your car or buy a new one.
        </li>
      </h5>
      <h5>
        <li>after registration you can see all posted cars</li>
      </h5>
      <h5>
        <li>
          If you want to sell your car you can create a car card with option yo
          edit and delete it any time
        </li>
      </h5>
      <h5>
        <li>
          you can add cars to your favorite list by clicking on the heart icons
        </li>
      </h5>
      <div className={"text-center"}>
        <img
          src="images/about.jpg"
          alt="thanks"
          style={{ margin: "50px" }}
          height={"400px"}
        />
      </div>
    </Container>
  );
}
export default AboutPage;
