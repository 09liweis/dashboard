import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { CONTACT_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';

interface Contact {
  [key: string]: string;
}

const ContactsPage: NextPage = () => {
  const emptyContacts: Array<Contact> = [];
  const [contacts, setContacts] = useState(emptyContacts);

  const emptyContact: Contact = { _id: '', name: '', group: '' };
  const [contact, setContact] = useState(emptyContact);

  const { user } = useContext(AppContext);

  const fetchContacts = async () => {
    const response = await fetchAPI({
      method: 'GET',
      url: CONTACT_LIST_API,
      body: {},
    });
    if (Array.isArray(response)) {
      setContacts(response);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const contactsHTML = contacts.map((contact) => (
    <article
      key={contact._id}
      className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative shadow-lg bg-white/[30%] rounded-lg p-2 mb-2 flex justify-between"
    >
      <h2 className="text-teal-600 cursor-pointer" onClick={() => handleContactEdit(contact)} >{contact.name}</h2>
      <span className="text-blue-500">{contact.groups}</span>
      {user._id && (
        <span
          className="cursor-pointer absolute right-0 top-0"
          onClick={() => handleContactDelete(contact._id)}
        >
          X
        </span>
      )}
    </article>
  ));

  const handleContactEdit = async (contact: Contact) => {
    setContact(contact);
  }

  const handleContactDelete = async (id: string) => {
    const todoResponse = await fetchAPI({
      url: `${CONTACT_LIST_API}/${id}`,
      method: 'DELETE',
      body: {},
    });
    fetchContacts();
  };

  const handleContactChange = (field: string, value: string) => {
    const newTodo = { ...contact };
    newTodo[field] = value;
    setContact(newTodo);
  };

  const handleContactSubmit = async (e: any) => {
    e.preventDefault();
    let url = CONTACT_LIST_API;
    let method = 'POST';
    if (contact._id) {
      url += `/${contact._id}`;
      method = 'PUT';
    }
    const todoResponse = await fetchAPI({ url, body: contact, method });
    if (todoResponse) {
      fetchContacts();
      setContact(emptyContact);
    }
  };

  return (
    <section>
      <h1 className='mb-3 text-2xl font-bold'>Total <span className='text-red-700 underline'>{contacts.length}</span> Contacts</h1>
      <section className='flex flex-wrap'>
        {contactsHTML}
      </section>
      {user._id && (
        <>
          <form onSubmit={handleContactSubmit}>
            <input
              placeholder='name'
              value={contact.name}
              onChange={(e) => handleContactChange('name', e.target.value)}
            />
            <input
              placeholder='group'
              value={contact.group}
              onChange={(e) => handleContactChange('group', e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
          <div className="fixed right-3 bottom-3 p-2 rounded-full font-bold text-lg shadow-lg bg-white leading-3 cursor-pointer">
            +
          </div>
        </>
      )}
    </section>
  );
};

export default ContactsPage;
