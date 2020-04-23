const CACHE = "cache-and-update";

const onOpen = cb => caches.open(CACHE).then(cb);

const preCache = () => onOpen(cache => cache.addAll([
    "./images/bugs/Agrias butterfly.png",
    "./images/bugs/Ant.png",
    "./images/bugs/Atlas moth.png",
    "./images/bugs/Bagworm.png",
    "./images/bugs/Banded dragonfly.png",
    "./images/bugs/Bell cricket.png",
    "./images/bugs/Blue weevil beetle.png",
    "./images/bugs/Brown cicada.png",
    "./images/bugs/Centipede.png",
    "./images/bugs/Cicada shell.png",
    "./images/bugs/Citrus long-horned beetle.png",
    "./images/bugs/Common bluebottle.png",
    "./images/bugs/Common butterfly.png",
    "./images/bugs/Cricket.png",
    "./images/bugs/Cyclommatus stag.png",
    "./images/bugs/Damselfly.png",
    "./images/bugs/Darner dragonfly.png",
    "./images/bugs/Diving beetle.png",
    "./images/bugs/Drone beetle.png",
    "./images/bugs/Dung beetle.png",
    "./images/bugs/Earth-boring dung beetle.png",
    "./images/bugs/Emperor butterfly.png",
    "./images/bugs/Evening cicada.png",
    "./images/bugs/Firefly.png",
    "./images/bugs/Flea.png",
    "./images/bugs/Fly.png",
    "./images/bugs/Giant cicada.png",
    "./images/bugs/Giant stag.png",
    "./images/bugs/Giant water bug.png",
    "./images/bugs/Giraffe stag.png",
    "./images/bugs/Golden stag.png",
    "./images/bugs/Goliath beetle.png",
    "./images/bugs/Grasshopper.png",
    "./images/bugs/Great purple emperor.png",
    "./images/bugs/Hermit crab.png",
    "./images/bugs/Honeybee.png",
    "./images/bugs/Horned atlas.png",
    "./images/bugs/Horned dynastid.png",
    "./images/bugs/Horned elephant.png",
    "./images/bugs/Horned hercules.png",
    "./images/bugs/Jewel beetle.png",
    "./images/bugs/Ladybug.png",
    "./images/bugs/Long locust.png",
    "./images/bugs/Madagascan sunset moth.png",
    "./images/bugs/Man-faced stink bug.png",
    "./images/bugs/Mantis.png",
    "./images/bugs/Migratory locust.png",
    "./images/bugs/Miyama stag.png",
    "./images/bugs/Mole cricket.png",
    "./images/bugs/Monarch butterfly.png",
    "./images/bugs/Mosquito.png",
    "./images/bugs/Moth.png",
    "./images/bugs/Orchid mantis.png",
    "./images/bugs/Paper kite butterfly.png",
    "./images/bugs/Peacock butterfly.png",
    "./images/bugs/Pill bug.png",
    "./images/bugs/Pondskater.png",
    "./images/bugs/Queen Alexandra's birdwing.png",
    "./images/bugs/Rainbow stag.png",
    "./images/bugs/Rajah Brooke's birdwing.png",
    "./images/bugs/Red dragonfly.png",
    "./images/bugs/Rice grasshopper.png",
    "./images/bugs/Robust cicada.png",
    "./images/bugs/Rosalia batesi beetle.png",
    "./images/bugs/Saw stag.png",
    "./images/bugs/Scarab beetle.png",
    "./images/bugs/Scorpion.png",
    "./images/bugs/Snail.png",
    "./images/bugs/Spider.png",
    "./images/bugs/Stinkbug.png",
    "./images/bugs/Tarantula.png",
    "./images/bugs/Tiger beetle.png",
    "./images/bugs/Tiger butterfly.png",
    "./images/bugs/Violin beetle.png",
    "./images/bugs/Walker cicada.png",
    "./images/bugs/Walking leaf.png",
    "./images/bugs/Walking stick.png",
    "./images/bugs/Wasp.png",
    "./images/bugs/Wharf roach.png",
    "./images/bugs/Yellow butterfly.png",
    "./images/fish/Anchovy.png",
    "./images/fish/Angelfish.png",
    "./images/fish/Arapaima.png",
    "./images/fish/Arowana.png",
    "./images/fish/Barred knifejaw.png",
    "./images/fish/Barreleye.png",
    "./images/fish/Betta.png",
    "./images/fish/Bitterling.png",
    "./images/fish/Black bass.png",
    "./images/fish/Blowfish.png",
    "./images/fish/Blue marlin.png",
    "./images/fish/Bluegill.png",
    "./images/fish/Butterfly fish.png",
    "./images/fish/Carp.png",
    "./images/fish/Catfish.png",
    "./images/fish/Char.png",
    "./images/fish/Cherry salmon.png",
    "./images/fish/Clown fish.png",
    "./images/fish/Coelacanth.png",
    "./images/fish/Crawfish.png",
    "./images/fish/Crucian carp.png",
    "./images/fish/Dab.png",
    "./images/fish/Dace.png",
    "./images/fish/Dorado.png",
    "./images/fish/Football fish.png",
    "./images/fish/Freshwater goby.png",
    "./images/fish/Frog.png",
    "./images/fish/Gar.png",
    "./images/fish/Giant snakehead.png",
    "./images/fish/Giant trevally.png",
    "./images/fish/Golden trout.png",
    "./images/fish/Goldfish.png",
    "./images/fish/Great white shark.png",
    "./images/fish/Guppy.png",
    "./images/fish/Hammerhead shark.png",
    "./images/fish/Horse mackerel.png",
    "./images/fish/Killifish.png",
    "./images/fish/King salmon.png",
    "./images/fish/Koi.png",
    "./images/fish/Loach.png",
    "./images/fish/Mahi-mahi.png",
    "./images/fish/Mitten crab.png",
    "./images/fish/Moray eel.png",
    "./images/fish/Napoleonfish.png",
    "./images/fish/Neon tetra.png",
    "./images/fish/Nibble fish.png",
    "./images/fish/Oarfish.png",
    "./images/fish/Ocean sunfish.png",
    "./images/fish/Olive flounder.png",
    "./images/fish/Pale chub.png",
    "./images/fish/Pike.png",
    "./images/fish/Piranha.png",
    "./images/fish/Pond smelt.png",
    "./images/fish/Pop-eyed goldfish.png",
    "./images/fish/Puffer fish.png",
    "./images/fish/Rainbowfish.png",
    "./images/fish/Ranchu goldfish.png",
    "./images/fish/Ray.png",
    "./images/fish/Red snapper.png",
    "./images/fish/Ribbon eel.png",
    "./images/fish/Saddled bichir.png",
    "./images/fish/Salmon.png",
    "./images/fish/Saw shark.png",
    "./images/fish/Sea bass.png",
    "./images/fish/Sea butterfly.png",
    "./images/fish/Sea horse.png",
    "./images/fish/Snapping Turtle.png",
    "./images/fish/Soft-shelled turtle.png",
    "./images/fish/Squid.png",
    "./images/fish/Stringfish.png",
    "./images/fish/Sturgeon.png",
    "./images/fish/Suckerfish.png",
    "./images/fish/Surgeonfish.png",
    "./images/fish/Sweetfish.png",
    "./images/fish/Tadpole.png",
    "./images/fish/Tilapia.png",
    "./images/fish/Tuna.png",
    "./images/fish/Whale shark.png",
    "./images/fish/Yellow perch.png",
    "./images/fish/Zebra turkeyfish.png",
    "./images/fossils/Acanthostega.png",
    "./images/fossils/Amber.png",
    "./images/fossils/Ammonite.png",
    "./images/fossils/Ankylo skull.png",
    "./images/fossils/Ankylo tail.png",
    "./images/fossils/Ankylo torso.png",
    "./images/fossils/Anomalocaris.png",
    "./images/fossils/Archaeopteryx.png",
    "./images/fossils/Archelon skull.png",
    "./images/fossils/Archelon tail.png",
    "./images/fossils/Australopith.png",
    "./images/fossils/Brachio chest.png",
    "./images/fossils/Brachio pelvis.png",
    "./images/fossils/Brachio skull.png",
    "./images/fossils/Brachio tail.png",
    "./images/fossils/Coprolite.png",
    "./images/fossils/Deinony tail.png",
    "./images/fossils/Deinony torso.png",
    "./images/fossils/Dimetrodon skull.png",
    "./images/fossils/Dimetrodon torso.png",
    "./images/fossils/Dinosaur track.png",
    "./images/fossils/Diplo chest.png",
    "./images/fossils/Diplo neck.png",
    "./images/fossils/Diplo pelvis.png",
    "./images/fossils/Diplo skull.png",
    "./images/fossils/Diplo tail tip.png",
    "./images/fossils/Diplo tail.png",
    "./images/fossils/Dunkleosteus.png",
    "./images/fossils/Eusthenopteron.png",
    "./images/fossils/Iguanodon skull.png",
    "./images/fossils/Iguanodon tail.png",
    "./images/fossils/Iguanodon torso.png",
    "./images/fossils/Juramaia.png",
    "./images/fossils/Left megalo side.png",
    "./images/fossils/Left ptera wing.png",
    "./images/fossils/Left quetzal wing.png",
    "./images/fossils/Mammoth skull.png",
    "./images/fossils/Mammoth torso.png",
    "./images/fossils/Megacero skull.png",
    "./images/fossils/Megacero tail.png",
    "./images/fossils/Megacero torso.png",
    "./images/fossils/Myllokunmingia.png",
    "./images/fossils/Ophthalmo skull.png",
    "./images/fossils/Ophthalmo torso.png",
    "./images/fossils/Pachysaurus skull.png",
    "./images/fossils/Pachysaurus tail.png",
    "./images/fossils/Parasaur skull.png",
    "./images/fossils/Parasaur tail.png",
    "./images/fossils/Parasaur torso.png",
    "./images/fossils/Plesio body.png",
    "./images/fossils/Plesio skull.png",
    "./images/fossils/Plesio tail.png",
    "./images/fossils/Ptera body.png",
    "./images/fossils/Quetzal torso.png",
    "./images/fossils/Right megalo side.png",
    "./images/fossils/Right ptera wing.png",
    "./images/fossils/Right quetzal wing.png",
    "./images/fossils/Sabertooth skull.png",
    "./images/fossils/Sabertooth tail.png",
    "./images/fossils/Shark-tooth pattern.png",
    "./images/fossils/Spino skull.png",
    "./images/fossils/Spino tail.png",
    "./images/fossils/Spino torso.png",
    "./images/fossils/Stego skull.png",
    "./images/fossils/Stego tail.png",
    "./images/fossils/Stego torso.png",
    "./images/fossils/T. rex skull.png",
    "./images/fossils/T. rex tail.png",
    "./images/fossils/T. rex torso.png",
    "./images/fossils/Tricera skull.png",
    "./images/fossils/Tricera tail.png",
    "./images/fossils/Tricera torso.png",
    "./images/fossils/Trilobite.png",
    "./images/touch/homescreen144.png",
    "./images/touch/homescreen168.png",
    "./images/touch/homescreen192.png",
    "./images/touch/homescreen48.png",
    "./images/touch/homescreen72.png",
    "./images/touch/homescreen96.png",
    "./images/villagers/Admiral.png",
    "./images/villagers/Agent S.png",
    "./images/villagers/Agnes.png",
    "./images/villagers/Al.png",
    "./images/villagers/Alfonso.png",
    "./images/villagers/Alice.png",
    "./images/villagers/Alli.png",
    "./images/villagers/Amelia.png",
    "./images/villagers/Anabelle.png",
    "./images/villagers/Anchovy.png",
    "./images/villagers/Angus.png",
    "./images/villagers/Anicotti.png",
    "./images/villagers/Ankha.png",
    "./images/villagers/Annalisa.png",
    "./images/villagers/Annalise.png",
    "./images/villagers/Antonio.png",
    "./images/villagers/Apollo.png",
    "./images/villagers/Apple.png",
    "./images/villagers/Astrid.png",
    "./images/villagers/Audie.png",
    "./images/villagers/Aurora.png",
    "./images/villagers/Ava.png",
    "./images/villagers/Avery.png",
    "./images/villagers/Axel.png",
    "./images/villagers/Baabara.png",
    "./images/villagers/Bam.png",
    "./images/villagers/Bangle.png",
    "./images/villagers/Barold.png",
    "./images/villagers/Bea.png",
    "./images/villagers/Beardo.png",
    "./images/villagers/Beau.png",
    "./images/villagers/Becky.png",
    "./images/villagers/Bella.png",
    "./images/villagers/Benedict.png",
    "./images/villagers/Benjamin.png",
    "./images/villagers/Bertha.png",
    "./images/villagers/Bettina.png",
    "./images/villagers/Bianca.png",
    "./images/villagers/Biff.png",
    "./images/villagers/Big Top.png",
    "./images/villagers/Bill.png",
    "./images/villagers/Billy.png",
    "./images/villagers/Biskit.png",
    "./images/villagers/Bitty.png",
    "./images/villagers/Blaire.png",
    "./images/villagers/Blanche.png",
    "./images/villagers/Bluebear.png",
    "./images/villagers/Bob.png",
    "./images/villagers/Bonbon.png",
    "./images/villagers/Bones.png",
    "./images/villagers/Boomer.png",
    "./images/villagers/Boone.png",
    "./images/villagers/Boots.png",
    "./images/villagers/Boris.png",
    "./images/villagers/Boyd.png",
    "./images/villagers/Bree.png",
    "./images/villagers/Broccolo.png",
    "./images/villagers/Broffina.png",
    "./images/villagers/Bruce.png",
    "./images/villagers/Bubbles.png",
    "./images/villagers/Buck.png",
    "./images/villagers/Bud.png",
    "./images/villagers/Bunnie.png",
    "./images/villagers/Butch.png",
    "./images/villagers/Buzz.png",
    "./images/villagers/Cally.png",
    "./images/villagers/Camofrog.png",
    "./images/villagers/Canberra.png",
    "./images/villagers/Candi.png",
    "./images/villagers/Carmen.png",
    "./images/villagers/Caroline.png",
    "./images/villagers/Carrie.png",
    "./images/villagers/Cashmere.png",
    "./images/villagers/Celia.png",
    "./images/villagers/Cesar.png",
    "./images/villagers/Chadder.png",
    "./images/villagers/Charlise.png",
    "./images/villagers/Cheri.png",
    "./images/villagers/Cherry.png",
    "./images/villagers/Chester.png",
    "./images/villagers/Chevre.png",
    "./images/villagers/Chief.png",
    "./images/villagers/Chops.png",
    "./images/villagers/Chow.png",
    "./images/villagers/Chrissy.png",
    "./images/villagers/Claude.png",
    "./images/villagers/Claudia.png",
    "./images/villagers/Clay.png",
    "./images/villagers/Cleo.png",
    "./images/villagers/Clyde.png",
    "./images/villagers/Coach.png",
    "./images/villagers/Cobb.png",
    "./images/villagers/Coco.png",
    "./images/villagers/Cole.png",
    "./images/villagers/Colton.png",
    "./images/villagers/Cookie.png",
    "./images/villagers/Cousteau.png",
    "./images/villagers/Cranston.png",
    "./images/villagers/Croque.png",
    "./images/villagers/Cube.png",
    "./images/villagers/Curlos.png",
    "./images/villagers/Curly.png",
    "./images/villagers/Curt.png",
    "./images/villagers/Cyd.png",
    "./images/villagers/Cyrano.png",
    "./images/villagers/Daisy.png",
    "./images/villagers/Deena.png",
    "./images/villagers/Deirdre.png",
    "./images/villagers/Del.png",
    "./images/villagers/Deli.png",
    "./images/villagers/Derwin.png",
    "./images/villagers/Diana.png",
    "./images/villagers/Diva.png",
    "./images/villagers/Dizzy.png",
    "./images/villagers/Dobie.png",
    "./images/villagers/Doc.png",
    "./images/villagers/Dom.png",
    "./images/villagers/Dora.png",
    "./images/villagers/Dotty.png",
    "./images/villagers/Drago.png",
    "./images/villagers/Drake.png",
    "./images/villagers/Drift.png",
    "./images/villagers/Ed.png",
    "./images/villagers/Egbert.png",
    "./images/villagers/Elise.png",
    "./images/villagers/Ellie.png",
    "./images/villagers/Elmer.png",
    "./images/villagers/Eloise.png",
    "./images/villagers/Elvis.png",
    "./images/villagers/Erik.png",
    "./images/villagers/Eugene.png",
    "./images/villagers/Eunice.png",
    "./images/villagers/Fang.png",
    "./images/villagers/Fauna.png",
    "./images/villagers/Felicity.png",
    "./images/villagers/Filbert.png",
    "./images/villagers/Flip.png",
    "./images/villagers/Flo.png",
    "./images/villagers/Flora.png",
    "./images/villagers/Flurry.png",
    "./images/villagers/Francine.png",
    "./images/villagers/Frank.png",
    "./images/villagers/Freckles.png",
    "./images/villagers/Freya.png",
    "./images/villagers/Friga.png",
    "./images/villagers/Frita.png",
    "./images/villagers/Frobert.png",
    "./images/villagers/Fuchsia.png",
    "./images/villagers/Gabi.png",
    "./images/villagers/Gala.png",
    "./images/villagers/Gaston.png",
    "./images/villagers/Gayle.png",
    "./images/villagers/Genji.png",
    "./images/villagers/Gigi.png",
    "./images/villagers/Gladys.png",
    "./images/villagers/Gloria.png",
    "./images/villagers/Goldie.png",
    "./images/villagers/Gonzo.png",
    "./images/villagers/Goose.png",
    "./images/villagers/Graham.png",
    "./images/villagers/Greta.png",
    "./images/villagers/Grizzly.png",
    "./images/villagers/Groucho.png",
    "./images/villagers/Gruff.png",
    "./images/villagers/Gwen.png",
    "./images/villagers/Hamlet.png",
    "./images/villagers/Hamphrey.png",
    "./images/villagers/Hans.png",
    "./images/villagers/Harry.png",
    "./images/villagers/Hazel.png",
    "./images/villagers/Henry.png",
    "./images/villagers/Hippeux.png",
    "./images/villagers/Hopkins.png",
    "./images/villagers/Hopper.png",
    "./images/villagers/Hornsby.png",
    "./images/villagers/Huck.png",
    "./images/villagers/Hugh.png",
    "./images/villagers/Iggly.png",
    "./images/villagers/Ike.png",
    "./images/villagers/JacobNAJakeyPAL.png",
    "./images/villagers/Jacques.png",
    "./images/villagers/Jambette.png",
    "./images/villagers/Jay.png",
    "./images/villagers/Jeremiah.png",
    "./images/villagers/Jitters.png",
    "./images/villagers/Joey.png",
    "./images/villagers/Judy.png",
    "./images/villagers/Julia.png",
    "./images/villagers/Julian.png",
    "./images/villagers/June.png",
    "./images/villagers/Kabuki.png",
    "./images/villagers/Katt.png",
    "./images/villagers/Keaton.png",
    "./images/villagers/Ken.png",
    "./images/villagers/Ketchup.png",
    "./images/villagers/Kevin.png",
    "./images/villagers/Kid Cat.png",
    "./images/villagers/Kidd.png",
    "./images/villagers/Kiki.png",
    "./images/villagers/Kitt.png",
    "./images/villagers/Kitty.png",
    "./images/villagers/Klaus.png",
    "./images/villagers/Knox.png",
    "./images/villagers/Kody.png",
    "./images/villagers/Kyle.png",
    "./images/villagers/Leonardo.png",
    "./images/villagers/Leopold.png",
    "./images/villagers/Lily.png",
    "./images/villagers/Limberg.png",
    "./images/villagers/Lionel.png",
    "./images/villagers/Lobo.png",
    "./images/villagers/Lolly.png",
    "./images/villagers/Lopez.png",
    "./images/villagers/Louie.png",
    "./images/villagers/Lucha.png",
    "./images/villagers/Lucky.png",
    "./images/villagers/Lucy.png",
    "./images/villagers/Lyman.png",
    "./images/villagers/Mac.png",
    "./images/villagers/Maddie.png",
    "./images/villagers/Maelle.png",
    "./images/villagers/Maggie.png",
    "./images/villagers/Mallary.png",
    "./images/villagers/Maple.png",
    "./images/villagers/Marcel.png",
    "./images/villagers/Marcie.png",
    "./images/villagers/Margie.png",
    "./images/villagers/Marina.png",
    "./images/villagers/Marshal.png",
    "./images/villagers/Mathilda.png",
    "./images/villagers/Megan.png",
    "./images/villagers/Melba.png",
    "./images/villagers/Merengue.png",
    "./images/villagers/Merry.png",
    "./images/villagers/Midge.png",
    "./images/villagers/Mint.png",
    "./images/villagers/Mira.png",
    "./images/villagers/Miranda.png",
    "./images/villagers/Mitzi.png",
    "./images/villagers/Moe.png",
    "./images/villagers/Molly.png",
    "./images/villagers/Monique.png",
    "./images/villagers/Monty.png",
    "./images/villagers/Moose.png",
    "./images/villagers/Mott.png",
    "./images/villagers/Muffy.png",
    "./images/villagers/Murphy.png",
    "./images/villagers/Nan.png",
    "./images/villagers/Nana.png",
    "./images/villagers/Naomi.png",
    "./images/villagers/Nate.png",
    "./images/villagers/Nibbles.png",
    "./images/villagers/Norma.png",
    "./images/villagers/O'Hare.png",
    "./images/villagers/Octavian.png",
    "./images/villagers/Olaf.png",
    "./images/villagers/Olive.png",
    "./images/villagers/Olivia.png",
    "./images/villagers/Opal.png",
    "./images/villagers/Ozzie.png",
    "./images/villagers/Pancetti.png",
    "./images/villagers/Pango.png",
    "./images/villagers/Paolo.png",
    "./images/villagers/Papi.png",
    "./images/villagers/Pashmina.png",
    "./images/villagers/Pate.png",
    "./images/villagers/Patty.png",
    "./images/villagers/Paula.png",
    "./images/villagers/Peaches.png",
    "./images/villagers/Peanut.png",
    "./images/villagers/Pecan.png",
    "./images/villagers/Peck.png",
    "./images/villagers/Peewee.png",
    "./images/villagers/Peggy.png",
    "./images/villagers/Pekoe.png",
    "./images/villagers/Penelope.png",
    "./images/villagers/Phil.png",
    "./images/villagers/Phoebe.png",
    "./images/villagers/Pierce.png",
    "./images/villagers/Pietro.png",
    "./images/villagers/Pinky.png",
    "./images/villagers/Piper.png",
    "./images/villagers/Pippy.png",
    "./images/villagers/Plucky.png",
    "./images/villagers/Pompom.png",
    "./images/villagers/Poncho.png",
    "./images/villagers/Poppy.png",
    "./images/villagers/Portia.png",
    "./images/villagers/Prince.png",
    "./images/villagers/Puck.png",
    "./images/villagers/Puddles.png",
    "./images/villagers/Pudge.png",
    "./images/villagers/Punchy.png",
    "./images/villagers/Purrl.png",
    "./images/villagers/Queenie.png",
    "./images/villagers/Quillson.png",
    "./images/villagers/Raddle.png",
    "./images/villagers/Rasher.png",
    "./images/villagers/Raymond.png",
    "./images/villagers/Renée.png",
    "./images/villagers/Reneigh.png",
    "./images/villagers/Rex.png",
    "./images/villagers/Rhonda.png",
    "./images/villagers/Ribbot.png",
    "./images/villagers/Ricky.png",
    "./images/villagers/Rizzo.png",
    "./images/villagers/Roald.png",
    "./images/villagers/Robin.png",
    "./images/villagers/Rocco.png",
    "./images/villagers/Rocket.png",
    "./images/villagers/Rod.png",
    "./images/villagers/Rodeo.png",
    "./images/villagers/Rodney.png",
    "./images/villagers/Rolf.png",
    "./images/villagers/Rooney.png",
    "./images/villagers/Rory.png",
    "./images/villagers/Roscoe.png",
    "./images/villagers/Rosie.png",
    "./images/villagers/Rowan.png",
    "./images/villagers/Ruby.png",
    "./images/villagers/Rudy.png",
    "./images/villagers/Sally.png",
    "./images/villagers/Samson.png",
    "./images/villagers/Sandy.png",
    "./images/villagers/Savannah.png",
    "./images/villagers/Scoot.png",
    "./images/villagers/Shari.png",
    "./images/villagers/Sheldon.png",
    "./images/villagers/Shep.png",
    "./images/villagers/Sherb.png",
    "./images/villagers/Simon.png",
    "./images/villagers/Skye.png",
    "./images/villagers/Sly.png",
    "./images/villagers/Snake.png",
    "./images/villagers/Snooty.png",
    "./images/villagers/Soleil.png",
    "./images/villagers/Sparro.png",
    "./images/villagers/Spike.png",
    "./images/villagers/SporkNACracklePAL.png",
    "./images/villagers/Sprinkle.png",
    "./images/villagers/Sprocket.png",
    "./images/villagers/Static.png",
    "./images/villagers/Stella.png",
    "./images/villagers/Sterling.png",
    "./images/villagers/Stinky.png",
    "./images/villagers/Stitches.png",
    "./images/villagers/Stu.png",
    "./images/villagers/Sydney.png",
    "./images/villagers/Sylvana.png",
    "./images/villagers/Sylvia.png",
    "./images/villagers/T-Bone.png",
    "./images/villagers/Tabby.png",
    "./images/villagers/Tad.png",
    "./images/villagers/Tammi.png",
    "./images/villagers/Tammy.png",
    "./images/villagers/Tangy.png",
    "./images/villagers/Tank.png",
    "./images/villagers/Tasha.png",
    "./images/villagers/Teddy.png",
    "./images/villagers/Tex.png",
    "./images/villagers/Tia.png",
    "./images/villagers/Tiffany.png",
    "./images/villagers/Timbra.png",
    "./images/villagers/Tipper.png",
    "./images/villagers/Tom.png",
    "./images/villagers/Truffles.png",
    "./images/villagers/Tucker.png",
    "./images/villagers/Tutu.png",
    "./images/villagers/Twiggy.png",
    "./images/villagers/Tybalt.png",
    "./images/villagers/Ursala.png",
    "./images/villagers/Velma.png",
    "./images/villagers/Vesta.png",
    "./images/villagers/Vic.png",
    "./images/villagers/Victoria.png",
    "./images/villagers/Violet.png",
    "./images/villagers/Vivian.png",
    "./images/villagers/Vladimir.png",
    "./images/villagers/Wade.png",
    "./images/villagers/Walker.png",
    "./images/villagers/Walt.png",
    "./images/villagers/Wart Jr..png",
    "./images/villagers/Weber.png",
    "./images/villagers/Wendy.png",
    "./images/villagers/Whitney.png",
    "./images/villagers/Willow.png",
    "./images/villagers/Winnie.png",
    "./images/villagers/Wolfgang.png",
    "./images/villagers/Yuka.png",
    "./images/villagers/Zell.png",
    "./images/villagers/Zucker.png",
    "./js/app.js",
    "./js/0.app.js",
    "./js/1.app.js",
    "./js/3.app.js",
    "./js/4.app.js",
    "./js/5.app.js",
    "./favicon.ico",
    "./index.html",
    "./manifest.webmanifest",
]));

const fromCache = request => onOpen(
    cache => cache.match(request).then(
        matching => matching || Promise.reject("no-match")
    )
);

const toCache = request => onOpen(
    cache => fetch(request).then(
        response => cache.put(request, response)
    )
);

self.addEventListener("install", evt => {
    evt.waitUntil(preCache());
});

self.addEventListener("fetch", evt => {
    const { request } = evt;
    evt.respondWith(fromCache(request));
    evt.waitUntil(toCache(request));
});
