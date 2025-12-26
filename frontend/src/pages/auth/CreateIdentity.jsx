import { createIdentity } from "../../services/identity";
import { useIdentityStore } from "../../store/useIdentityStore";

const CreateIdentity = () => {
  const setIdentity = useIdentityStore((state) => state.setIdentity);

  const handleCreate = async () => {
    const identity = await createIdentity();
    setIdentity(identity);
    alert("Identity created successfully!");
  };

  return (
    <div>
      <h2>Create Decentralized Identity</h2>
      <p>
        This will generate a cryptographic identity stored locally on your device.
      </p>
      <button onClick={handleCreate}>
        Generate Identity
      </button>
    </div>
  );
};

export default CreateIdentity;
