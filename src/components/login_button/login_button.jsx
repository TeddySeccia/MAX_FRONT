

export const LoginButton = ({ text, description }) => (
    <div className='button'>
      <p>{description}</p>
      <button type="button" className='button'>{text}</button>
    </div>
  );