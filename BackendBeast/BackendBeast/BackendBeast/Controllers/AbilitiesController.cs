using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using BackendBeast.Model;

namespace BackendBeast.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]

    public class AbilitiesController : ApiController
    {
        private BayouEntities1 db = new BayouEntities1();

        // GET: api/Abilities
        public IQueryable<Ability> GetAbility()
        {
            return db.Ability;
        }

        // GET: api/Abilities/5
        [ResponseType(typeof(Ability))]
        public IHttpActionResult GetAbility(int id)
        {
            Ability ability = db.Ability.Find(id);
            if (ability == null)
            {
                return NotFound();
            }

            return Ok(ability);
        }

        // PUT: api/Abilities/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAbility(int id, Ability ability)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ability.id)
            {
                return BadRequest();
            }

            db.Entry(ability).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AbilityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Abilities
        [ResponseType(typeof(Ability))]
        public IHttpActionResult PostAbility(Ability ability)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ability.Add(ability);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (AbilityExists(ability.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = ability.id }, ability);
        }

        // DELETE: api/Abilities/5
        [ResponseType(typeof(Ability))]
        public IHttpActionResult DeleteAbility(int id)
        {
            Ability ability = db.Ability.Find(id);
            if (ability == null)
            {
                return NotFound();
            }

            db.Ability.Remove(ability);
            db.SaveChanges();

            return Ok(ability);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AbilityExists(int id)
        {
            return db.Ability.Count(e => e.id == id) > 0;
        }
    }
}