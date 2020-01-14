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
    public class MonstersController : ApiController
    {
        private BayouEntities1 db = new BayouEntities1();

        // GET: api/Monsters
        public IQueryable<Monster> GetMonster()
        {
            var monster = (db.Monster.Select(mob => new MonsterDisplay
                {
                    ID = mob.id,
                    Name = mob.name,
                    Hp_init = mob.hp_init,
                    Strength_init = mob.strength_init,
                    Toughness_init = mob.toughness_init,
                    Smartness_init = mob.smartness_init,
                    Description = mob.description,
                    Picture = mob.picture,
                    AbilityID = db.Ability.Where(t => t.monster_id == mob.id)
                }).ToList()
            );

            return db.Monster;
        }

        // GET: api/Monsters/5
        [ResponseType(typeof(Monster))]
        public IHttpActionResult GetMonster(int id)
        {
            Monster monster = db.Monster.Find(id);
            if (monster == null)
            {
                return NotFound();
            }

            return Ok(monster);
        }

        // PUT: api/Monsters/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMonster(int id, Monster monster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != monster.id)
            {
                return BadRequest();
            }

            db.Entry(monster).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MonsterExists(id))
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

        // POST: api/Monsters
        [ResponseType(typeof(Monster))]
        public IHttpActionResult PostMonster(Monster monster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Monster.Add(monster);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MonsterExists(monster.id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = monster.id }, monster);
        }

        // DELETE: api/Monsters/5
        [ResponseType(typeof(Monster))]
        public IHttpActionResult DeleteMonster(int id)
        {
            Monster monster = db.Monster.Find(id);
            if (monster == null)
            {
                return NotFound();
            }

            db.Monster.Remove(monster);
            db.SaveChanges();

            return Ok(monster);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MonsterExists(int id)
        {
            return db.Monster.Count(e => e.id == id) > 0;
        }
    }

    public class MonsterDisplay
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Hp_init { get; set; }
        public int Strength_init { get; set; }
        public int Toughness_init { get; set; }
        public int Smartness_init { get; set; }
        public string Description { get; set; }
        public byte[] Picture { get; set; }
        public IQueryable<Ability> AbilityID { get; set; }
    }
}