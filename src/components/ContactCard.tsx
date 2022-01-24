import { useAppDispatch } from "../store/hooks";

import {
  setFavorite,
  deleteContact
} from "../store/slices/contacts/contactsSlice";

import ContextualHeading from "./ContextualHeading";
import HeadingRegion from "./HeadingRegion";

import { ContactRecord, ID } from "../types";

interface Props {
  record: ContactRecord;
  onEditContact: (id: ID) => void;
}

export default function ContactCard({ record, onEditContact }: Props) {
  const dispatch = useAppDispatch();

  const {
    id,
    contact: { name, email, username, phone, website, address },
    isFavorite
  } = record;

  return (
    <article>
      <ContextualHeading>
        {name} <span>({username})</span>
      </ContextualHeading>
      <HeadingRegion>
        <a href={`mailto:${email}`}>{email}</a>
        {phone && (
          <p>
            Phone: <a href={`tel:${phone}`}>{phone}</a>
          </p>
        )}
        {website && (
          <p>
            Website: <a href={website}>{website}</a>
          </p>
        )}
        <button onClick={() => onEditContact(id)}>Edit contact</button>
        <button
          onClick={() => dispatch(setFavorite({ id, isFavorite: !isFavorite }))}
        >
          {isFavorite ? "Remove from favorites" : "Add to favorites"}
        </button>
        <button onClick={() => dispatch(deleteContact(id))}>
          Delete contact
        </button>
      </HeadingRegion>
    </article>
  );
}
