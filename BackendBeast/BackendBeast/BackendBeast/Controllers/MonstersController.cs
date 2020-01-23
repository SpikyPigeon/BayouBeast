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
        private BayouEntities2 db = new BayouEntities2();

        // GET: api/Monsters
        public List<MonstersDisplay> GetMonsters()
        {
            var monster = (db.Monsters.Select(mob => new MonstersDisplay
            {
                ID = mob.id,
                Name = mob.name,
                Hp_init = mob.hp_init,
                Hp_current = mob.hp_init,
                Strength_init = mob.strength_init,
                Toughness_init = mob.toughness_init,
                Smartness_init = mob.smartness_init,
                Description = mob.description,
                Picture = mob.picture,
                AbilityID = db.Abilities.Where(t => t.monster_id == mob.id)
            }).ToList()
            );

            return monster;
        }

        // GET: api/Monsters/5
        [ResponseType(typeof(Monster))]
        public IHttpActionResult GetMonster(int id)
        {
            Monster monster = db.Monsters.Find(id);
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

            db.Monsters.Add(monster);

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
            Monster monster = db.Monsters.Find(id);
            if (monster == null)
            {
                return NotFound();
            }

            db.Monsters.Remove(monster);
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
            return db.Monsters.Count(e => e.id == id) > 0;
        }
    }

    public class MonstersDisplay
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Hp_init { get; set; }
        public int Hp_current { get; set; }
        public int Strength_init { get; set; }
        public int Toughness_init { get; set; }
        public int Smartness_init { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public IQueryable<Ability> AbilityID { get; set; }
    }
}