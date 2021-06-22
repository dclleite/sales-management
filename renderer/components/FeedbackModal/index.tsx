import Modal from "../Modal";
import { Button } from "../Button";
import { Typography } from "@material-ui/core";

function FeedbackModal({ title, image, buttonText, open, action }) {
  return <Modal open={open}>
    <div style={{ width: '484px', height: '382', padding: '34px 118px', textAlign: 'center' }}>
      <Typography style={{ color: '#2A9BD7', fontSize: '24px' }}>
        {title}
      </Typography>
      <div>
        {image}
      </div>
      <Button style={{ margin: '8px auto' }} onClick={action}>
        {buttonText}
      </Button>
    </div>
  </Modal>
}

export default FeedbackModal