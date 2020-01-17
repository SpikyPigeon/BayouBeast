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

    public class IntrudersController : ApiController
    {
        private BayouEntities2 db = new BayouEntities2();

        // GET: api/Intruders
        public IQueryable<Intruder> GetIntruders()
        {
            return db.Intruders;
        }

        // GET: api/Intruders/5
        [ResponseType(typeof(Intruder))]
        public IHttpActionResult GetIntruder(int id)
        {
            Intruder intruder = db.Intruders.Find(id);
            if (intruder == null)
            {
                return NotFound();
            }

            return Ok(intruder);
        }

        // PUT: api/Intruders/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutIntruder(int id, Intruder intruder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != intruder.id)
            {
                return BadRequest();
            }

            db.Entry(intruder).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IntruderExists(id))
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

        // POST: api/Intruders
        [ResponseType(typeof(Intruder))]
        public IHttpActionResult PostIntruder(Intruder intruder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Intruders.Add(intruder);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (IntruderExists(intruder.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = intruder.id }, intruder);
        }

        // DELETE: api/Intruders/5
        [ResponseType(typeof(Intruder))]
        public IHttpActionResult DeleteIntruder(int id)
        {
            Intruder intruder = db.Intruders.Find(id);
            if (intruder == null)
            {
                return NotFound();
            }

            db.Intruders.Remove(intruder);
            db.SaveChanges();

            return Ok(intruder);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool IntruderExists(int id)
        {
            return db.Intruders.Count(e => e.id == id) > 0;
        }
    }
}