<template>
  <div class="about">
    <br />
    <img src="../assets/AboutHeader.png" />
    <br />

    <b-container id="about-container">
      <b-row>
        <b-col id="col-roei">
          <h2 id="header-roei" style="text-align:center;font-weight:bold">
            Roei Cohen
          </h2>
          <br />
          <p class="about-paragraph">
            My Name is Roei Cohen and I live in Beer Sheva. I am a third year
            student for Intellgence Technology Engineering and I study in
            Ben-Gurion University. I have 2 parents and sister and a brother
            which both are younger than me, what basiclly makes me the oldest
            brother in home. I like to play football and tv-games, buy mostly I
            just like to write codes.
          </p>
          <p class="about-paragraph">
            Here are some pictures of me from different times (when COVID-19 was
            only a theory):
          </p>
          <img src="../assets/roei.jpeg" height="180px" width="180px" />
          <img src="../assets/roeitwo.jpeg" height="180px" width="180px" />
          <img src="../assets/roeithree.jpeg" height="180px" width="180px" />
          <br />
          <br />
          <p class="about-paragraph">
            I hope you've enjoyed the website and found some nice recipes you
            can cook and try by yourself at home &#128515;
          </p>
        </b-col>

        <b-col>
          <h2 id="header-roei" style="text-align:center;font-weight:bold">
            Roi Nissan
          </h2>
          <br />
          <p class="about-paragraph">
            My name is Roi Nisan, I'm 25 years old and from Beer sheba.<br /><br />
            I am a third year student in the Information Systems Engeneering
            department in Ben Gurion University.<br /><br />
            I like Play Tennis, learn new things and program creative softwares.
            <br /><br />
            I wish we all come togther and overcome the corona virus.
          </p>
          <br />
          <img src="../assets/roin1.jpg" height="180px" width="180px" />
          <img src="../assets/roin2.jpeg" height="180px" width="180px" />
          <img src="../assets/roin3.jpg" height="180px" width="180px" />
        </b-col>
      </b-row>
    </b-container>
    <h2 id="links-header">
      Here are links to older assignments we had in this course:
    </h2>
    <br />
    <b-list-group
      horizontal
      v-for="(value, name, index) in details.previousAssignments"
      :key="value"
      class="listItem"
    >
      <b-list-group-item
        :variant="assignmentColors[index]"
        style="width: 500px"
      >
        <b-link :href="value">{{ name }}</b-link>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "AboutPage",

  data() {
    return {
      details: {},
      assignmentColors: ["primary", "success", "danger", "warning"],
    };
  },
  mounted() {
    this.getAboutDetails();
  },
  methods: {
    async getAboutDetails() {
      try {
        const response = await this.axios.get(
          `https://assignment3r-r.herokuapp.com/info/About`
        );
        this.details = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.about {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.listItem {
  align-items: center;
}
.about-paragraph {
  font-weight: bold;
}
#about-header {
  font-size: 50px;
}
#links-header {
  font-size: 38px;
}
</style>
