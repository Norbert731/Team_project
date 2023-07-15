﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsListController : ControllerBase
    {
        private readonly Models.ContactsDbContext _context;

        public ContactsListController(Models.ContactsDbContext context)
        {
            _context = context;
        }

        // GET: api/ContactsList
        [HttpGet]
        public ActionResult<IEnumerable<ContactsList>> GetContactsList()
        {
            var contactsList = _context.ContactsList.Include(c => c.User).ToList();
            return contactsList;
        }

        // GET: api/ContactsList/5
        [HttpGet("{id}")]
        public ActionResult<ContactsList> GetContactsList(int id)
        {
            var contactsList = _context.ContactsList.Include(c => c.User).FirstOrDefault(c => c.ContactID == id);

            if (contactsList == null)
            {
                return NotFound();
            }

            // Wykonaj dowolne operacje na contactsList.User

            return contactsList;
        }

        // POST: api/ContactsList
        [HttpPost]
        public ActionResult<ContactsList> PostContactsList([FromBody] ContactsListDto contactsListDto)
        {
            var contactsList = new ContactsList
            {
                ContactID = contactsListDto.ContactID,
                UserID = contactsListDto.UserID,
                FirstName = contactsListDto.FirstName,
                LastName = contactsListDto.LastName,
                Email = contactsListDto.Email,
                Gender = contactsListDto.Gender,
                City = contactsListDto.City
            };

            _context.ContactsList.Add(contactsList);
            _context.SaveChanges();

            return CreatedAtAction("GetContactsList", new { id = contactsList.ContactID }, contactsList);
        }




        // PUT: api/ContactsList/5
        [HttpPut("{id}")]
        public IActionResult PutContactsList(int id, [FromBody] ContactsListDto contactsListDto)
        {
            if (id != contactsListDto.ContactID)
            {
                return BadRequest();
            }

            var contactsList = new ContactsList
            {
                ContactID = contactsListDto.ContactID,
                UserID = contactsListDto.UserID,
                FirstName = contactsListDto.FirstName,
                LastName = contactsListDto.LastName,
                Email = contactsListDto.Email,
                Gender = contactsListDto.Gender,
                City = contactsListDto.City
            };

            _context.Entry(contactsList).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }


        // DELETE: api/ContactsList/5
        [HttpDelete("{id}")]
        public IActionResult DeleteContactsList(int id)
        {
            var contactsList = _context.ContactsList.Find(id);
            if (contactsList == null)
            {
                return NotFound();
            }

            _context.ContactsList.Remove(contactsList);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
