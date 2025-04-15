import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../AppContext';
import { CONTACT_LIST_API } from '../constants';
import { fetchAPI } from '../helpers';
import Loading from '../components/Loading';

interface Contact {
  [key: string]: string;
}

const ContactsPage: NextPage = () => {
  const emptyContacts: Array<Contact> = [];
  const [contacts, setContacts] = useState(emptyContacts);

  const emptyContact: Contact = { _id: '', name: '', group: '' };
  const [contact, setContact] = useState(emptyContact);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

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

  useEffect(()=> {
    if (!showForm) {
      setContact(emptyContact);
    }
  },[showForm]);

  const contactsHTML = contacts.map((contact) => (
    <article
      key={contact._id}
      className="group w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative shadow-lg bg-white/[30%] rounded-lg p-2 mb-2 flex justify-between"
    >
      <h2 className="text-teal-600 cursor-pointer" onClick={() => handleContactEdit(contact)} >{contact.name}</h2>
      <section>
        <span className="text-blue-500">{contact.groups}</span>
        {user._id && (
          <span
            className="group-hover:opacity-100 hover:scale-105 rounded-sm duration-300 transition cursor-pointer bg-red-800 text-white p-1 opacity-0"
            onClick={() => handleContactDelete(contact._id)}
          >
            X
          </span>
        )}
      </section>
    </article>
  ));

  const handleContactEdit = async (contact: Contact) => {
    contact.group = contact.groups[0];
    setContact(contact);
    setShowForm(true);
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
    setLoading(true);
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
      setShowForm(false);
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold'>Total <span className='text-red-700 underline'>{contacts.length}</span> Contacts</h1>
      <section className='flex flex-wrap'>
        {contactsHTML}
      </section>
      {user._id &&
        <div className="fixed right-3 bottom-3 p-2 rounded-full font-bold text-lg shadow-lg bg-white leading-3 cursor-pointer" onClick={()=>setShowForm(true)}>+</div>
      }
      {user._id && showForm && (
        <section className='fixed w-full h-full left-0 top-0 bg-gray-600 flex justify-center items-center'>
          <a className='cursor-pointer transition duration-300 hover:scale-105 absolute top-5 right-5 text-white bg-red-800 p-2 rounded-sm' onClick={()=>setShowForm(false)}>Close</a>
          <form onSubmit={handleContactSubmit} className='w-96 bg-white p-2 rounded-sm'>
            <input
              className='w-full mb-2 p-2 border rounded-sm'
              placeholder='name'
              value={contact.name}
              onChange={(e) => handleContactChange('name', e.target.value)}
            />
            <input
              className='w-full mb-2 p-2 border rounded-sm'
              placeholder='group'
              value={contact.group}
              onChange={(e) => handleContactChange('group', e.target.value)}
            />
            <button className='duration-300 transition hover:scale-105 bg-green-800 text-white p-2 border rounded-sm' type="submit">{loading && <Loading/>}{contact._id?'Update':'Add'}</button>
          </form>
        </section>
      )}
    </>
  );
};

export default ContactsPage;
